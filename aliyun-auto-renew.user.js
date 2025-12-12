// ==UserScript==

// @name         阿里云自动购买助手 

// @namespace    http://tampermonkey.net/

// @version      1.5

// @description  自动点击阿里云购买页面的 "1 年"、"立即购买" 和 "支付" 按钮，并关闭支付完成页面

// @author       You

// @match        https://common-buy.aliyun.com/*

// @match        https://finance.aliyun.com/*

// @match        https://cashier.aliyun.com/*

// @grant        window.close

// @grant        GM_openInTab

// @run-at       document-idle

// ==/UserScript==



(function() {

    'use strict'; // ✅ 已修复为英文引号



    console.log('[阿里云自动购买] 脚本已启动');



    // 等待元素出现的辅助函数

    function waitForElement(selector, textContent = null, maxAttempts = 40, interval = 500) {

        return new Promise((resolve, reject) => {

            let attempts = 0;



            const checkElement = () => {

                attempts++;

                const elements = document.querySelectorAll(selector);



                let targetElement = null;

                if (textContent) {

                    // 如果指定了文本内容，查找匹配的元素

                    for (let elem of elements) {

                        if (elem.textContent.trim() === textContent) {

                            targetElement = elem;

                            break;

                        }

                    }

                } else {

                    targetElement = elements[0];

                }



                if (targetElement) {

                    console.log(`[阿里云自动购买] 找到元素: ${selector}${textContent ? ` (文本: ${textContent})` : ''}`);

                    resolve(targetElement);

                } else if (attempts >= maxAttempts) {

                    reject(new Error(`未找到元素: ${selector}${textContent ? ` (文本: ${textContent})` : ''}`));

                } else {

                    setTimeout(checkElement, interval);

                }

            };



            checkElement();

        });

    }



    // 模拟点击

    function clickElement(element) {

        return new Promise((resolve) => {

            element.click();

            console.log(`[阿里云自动购买] 已点击: ${element.textContent.trim()}`);

            resolve();

        });

    }



    // 延迟函数

    function delay(ms) {

        return new Promise(resolve => setTimeout(resolve, ms));

    }



    // 购买页面流程 (common-buy.aliyun.com)

    async function buyPageSequence() {

        try {

            console.log('[阿里云自动购买] 等待购买页面加载...');

            await delay(2000);



            // 第一步：点击"1年"

            console.log('[阿里云自动购买] 查找"1年"按钮...');

            // 注意：阿里云的 class 可能会动态变化，如果失效请检查此处选择器

            const durationButton = await waitForElement('.vc-zjq-renew-duration-inner-item', '1年');

            await clickElement(durationButton);



            // 等待页面价格刷新

            console.log('[阿里云自动购买] 等待页面更新...');

            await delay(2000);



            // 第二步：点击"立即购买"

            console.log('[阿里云自动购买] 查找"立即购买"按钮...');

            const purchaseButton = await waitForElement('.vc-zjq-price-btn', '立即购买');

            await clickElement(purchaseButton);



            console.log('[阿里云自动购买] ✅ 购买页面流程完成！');



        } catch (error) {

            console.error('[阿里云自动购买] ❌ 购买页面执行失败:', error.message);

        }

    }



    // 支付页面流程 (finance.aliyun.com)

    async function paymentPageSequence() {

        try {

            console.log('[阿里云自动购买] 等待支付页面加载...');

            await delay(2000);



            // 点击"支付"按钮

            console.log('[阿里云自动购买] 查找"支付"按钮...');

            const paymentButton = await waitForElement('button.summary-submit-button[type="submit"]', '支付');

            await clickElement(paymentButton);



            console.log('[阿里云自动购买] ✅ 支付页面流程完成！');



        } catch (error) {

            console.error('[阿里云自动购买] ❌ 支付页面执行失败:', error.message);

        }

    }



    // 支付完成页面流程 (cashier.aliyun.com)

    async function cashierPageSequence() {

        try {

            console.log('[阿里云自动购买] 检测到支付完成页面，准备关闭并打开新页面...');

            await delay(2000);



            // 打开新的购买页面

            const newUrl = 'https://common-buy.aliyun.com/?orderType=xxxxxxx';

            console.log('[阿里云自动购买] 打开新页面:', newUrl);



            // 使用 GM_openInTab 打开新标签页，并不将焦点切换过去，以便当前页面能继续执行关闭逻辑

            // 如果希望直接跳过去，active: true

            if (typeof GM_openInTab !== 'undefined') {

                GM_openInTab(newUrl, { active: true, insert: true });

            } else {

                window.open(newUrl, '_blank');

            }



            // 等待一下再关闭当前页面

            await delay(1000);

            console.log('[阿里云自动购买] ✅ 关闭支付完成页面');

            window.close();



        } catch (error) {

            console.error('[阿里云自动购买] ❌ 关闭页面失败:', error.message);

        }

    }



    // 主执行流程 - 根据当前页面选择对应流程

    async function autoClickSequence() {

        const currentUrl = window.location.href;



        if (currentUrl.includes('common-buy.aliyun.com')) {

            console.log('[阿里云自动购买] 检测到购买页面');

            await buyPageSequence();

        } else if (currentUrl.includes('finance.aliyun.com')) {

            console.log('[阿里云自动购买] 检测到支付页面');

            await paymentPageSequence();

        } else if (currentUrl.includes('cashier.aliyun.com')) { // 修正了判断逻辑，去掉了过于严格的 /order

            console.log('[阿里云自动购买] 检测到支付完成页面');

            await cashierPageSequence();

        }

    }



    // 启动脚本

    if (document.readyState === 'loading') {

        document.addEventListener('DOMContentLoaded', autoClickSequence);

    } else {

        autoClickSequence();

    }

})();

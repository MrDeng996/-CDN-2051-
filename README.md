# 阿里云 CDN/DCDN 自动续费助手 (白嫖至 2050 年) 🚀

[![Tampermonkey](https://img.shields.io/badge/Tampermonkey-Script-green.svg)](https://www.tampermonkey.net/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## 📖 简介

这是一个 **Tampermonkey (油猴)** 脚本，用于自动化阿里云免费 CDN/DCDN 套餐的续费流程。

众所周知，阿里云提供了免费版的 CDN/DCDN 套餐，但每次续费只能手动续费 1 年。如果你想“白嫖”到 2050 年，需要重复点击几十次。本脚本可以自动点击“1 年”、“立即购买”和“支付”按钮，并在支付完成后自动关闭当前页面并重新打开续费页面，实现全自动循环续费。

## ✨ 功能特性

* ✅ **自动选择时长**：自动点击购买页面的 “1 年” 按钮。
* ✅ **自动提交订单**：自动点击 “立即购买” 和 “支付” 按钮。
* ✅ **循环执行**：支付完成后自动关闭页面，并打开新的续费页面，实现无人值守。
* ✅ **零误触**：严格匹配阿里云购买、支付和收银台页面。

## 🛠️ 准备工作

1.  **浏览器**：Chrome, Edge, Firefox 等支持扩展的浏览器。
2.  **扩展程序**：安装 [Tampermonkey (油猴)](https://www.tampermonkey.net/) 插件。
3.  **阿里云账号**：确保你已经领取了 0 元的免费 CDN 或 DCDN 实例（不要选基础款，选免费版）。

## 🚀 安装与配置（重要）

### 第一步：获取脚本
下载本仓库中的 `aliyun-auto-renew.user.js` (或者新建脚本将代码复制进去)。

### 第二步：获取你的续费链接 (关键步骤) ⚠️
在运行脚本之前，你需要获取你自己实例的**专属续费链接**，并修改脚本代码。

1.  登录阿里云控制台。
2.  进入 **资源实例管理** 或 **CDN/DCDN 管理页面**。
3.  找到你的免费实例，点击 **“续费”**。
4.  进入续费页面后，复制浏览器地址栏的 **URL**。
    * 链接格式通常为：`https://common-buy.aliyun.com/?orderType=RENEW&commodityCode=...&instanceId=...`

### 第三步：修改脚本配置
打开油猴插件的脚本编辑器，找到代码中的第 **138 行**左右（`cashierPageSequence` 函数内），将 `newUrl` 的值替换为你刚才复制的链接。

```javascript
// 👇👇👇 将下方的链接替换为你自己的续费页面链接 👇👇👇
const newUrl = '[https://common-buy.aliyun.com/?orderType=RENEW&commodityCode=dcdn_dcdnserviceplan_public_cn&instanceId=你的实例ID](https://common-buy.aliyun.com/?orderType=RENEW&commodityCode=dcdn_dcdnserviceplan_public_cn&instanceId=你的实例ID)';

---
description: font-family常用组合的搭配原理
---

# font-family 字体组合

## 字体选择

### 中文字体

中文字符集非常大，一般不会全量加载自定义字体资源，一般只有视觉要求严格、字符范围可控的情况下使用。日常应用一般选择和系统默认字体相匹配或者指定系统自带字体。常见中文字体：

#### Windows 系统

- Microsoft Yahei（微软雅黑）无衬线体。和西文字体 Segoe UI 在 Vista 时期同时推出，为 ClearType 提供优化
- SimSun（宋体）：衬线体，默认字体

#### MacOS/iOS

- PingFang SC（苹方）：无衬线体，Mac OS X EL Capitan 后默认字体
- Heiti SC（黑体-简）：无衬线体，MacOS 10.6 后默认字体
- STHeiti（华文黑体）：无衬线体，MacOS 10.6 前默认字体
- Hiragino Sans GB（冬青黑/苹果丽黑）：无衬线体，日文冬青字体的简体中文版

### 英文字体

英文字符集覆盖 A-Za-z0-9，数量可观，可选用自定义字体优化显示效果。常见西文字体：

#### Windows 系统

- Segoe UI：无衬线体。和微软雅黑同时推出，微软雅黑支持西文字符集，因此需要与 Segoe UI 混合使用时，Segoe UI 需写在前
- Arial：默认无衬线体

#### MacOS/iOS

- San Francisco：Mac OS X EL Capitan 上新发布的西文字体，未公开接口，因此不能显式调用。在 CSS 中可以通过使用系统默认字体调用。

- Helvetica Neue：无衬线字体，常用西文字体。由于 PingFang SC 中包含西文字符集，因此需要使用 Helvetica Neue 时，Helvetica Neue 需写在前

#### Android

- Roboto：Android 或 Chrome OS 系统默认字体

##font-family

`font-family`匹配原理：在浏览器中，逐字匹配选择字体，一个字符在字体文件中没有对应的匹配则继续尝试后续列表中的字体，直到命中为止。

### 常用组合

```css
body {
  font-family: system-ui,
    // 默认系统字体，Chrome 56+/Safari 11+/Edge支持
      -apple-system, // MacOS/iOS上使用默认系统字体，适用于Safari/Firefox
      BlinkMacSystemFont,
    // MacOS/iOS上使用默认系统字体，适用于Chrome
      "Segoe UI", // Windows上西文字体使用Segoe UI
      Roboto,
    // Android或Chrome OS上西文字体使用Roboto
      "Helvetica Neue", // 低版本MacOS/iOS，使用Helvetica Neue显示西文
      "PingFang SC",
    // 低版本MacOS/iOS，使用PingFang SC显示中文
      "Microsoft YaHei", // Windows系统使用微软雅黑显示中西文
      sans-serif; // 无衬线字体，平台自行决定
}
```

#### MacOS/iOS

系统默认字体为西文字体 San Francisco，中文字体 PingFang SC

通过`system-ui/-apple-system/BlinkMacSystemFont`告知浏览器使用系统默认字体，

对于低版本浏览器，指定`Helvetica Neue` + `PingFang SC`

#### Windows

使用`Segoe UI` + 微软雅黑的组合

## 参考资料

[https://medium.com/@Pudge1996/pingfang-sc-或许不应该作为网页字体的首选项-70cc6d2258fa](https://medium.com/@Pudge1996/pingfang-sc-或许不应该作为网页字体的首选项-70cc6d2258fa)

[Segoe UI 是什么字体？是否适合用作网页默认字体？](https://www.zhihu.com/question/20382671/answer/14964799)

[System Font Stack](https://css-tricks.com/snippets/css/system-font-stack/)

[Web 字体 font-family 再探秘](https://www.cnblogs.com/coco1s/p/11350642.html)

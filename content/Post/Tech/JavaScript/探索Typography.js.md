# 探索Typography.js

起源是想为个人博客定制一个不错的文章排版，然而没有找到相关的工具，以此为契机接触到Typography.js。

根据[Typography.js官网](http://kyleamathews.github.io/typography.js/)的介绍，排版系统比较复杂，不同元素上的样式需要互相协调。

更改某一元素样式，往往需要把其他元素样式也做修改。

而Typography.js提供接口供开发者配置，根据配置自动生成各种元素的样式。

出于对排版系统生成逻辑的好奇，研究了Typography.js的源码。

## Lerna

Typegraphy.js项目通过monorepo做代码管理。

monorepo即把所有相关的模块放在一个repo中的代码管理方式，单个模块可以作为package独立发布，其优点在于：

- 统一构建工具、规则约束、测试方法
- 解决依赖包冗余、版本不一致的问题
- 方便模块间互相依赖管理

Lerna是实现monorepo的一种方式，即在一个仓库下管理多个模块的工具：管理包依赖，独立发布package



## typography

Lerna规定的目录结构中，所有包放置在packages目录下。所有包独立发布。

Typography.js的packages目录下，typography模块是主模块。

### defaultOptions

``` json
{
  	baseFontSize: "16px", // 基础font-size，以像素为单位
    baseLineHeight: 1.45,	// 基础line-height，无单位数值
    headerLineHeight: 1.1,	// 标题line-height
    scaleRatio: 2,	// h1 font-size和baseFontSize之间的倍数差，baseFontSize = 16px, scaleRatio = 2, h1 fontSize = 32px
    googleFonts: [],	// 指定需要从Google Font下载的字体资源
    headerFontFamily: [	// 标题的font-family
      "-apple-system",
      "BlinkMacSystemFont",
      "Segoe UI",
      "Roboto",
      "Oxygen",
      "Ubuntu",
      "Cantarell",
      "Fira Sans",
      "Droid Sans",
      "Helvetica Neue",
      "sans-serif",
    ],
    bodyFontFamily: ["georgia", "serif"],	// 文本的font-family
    headerColor: "inherit",	// 标题字体颜色
    bodyColor: "hsla(0,0%,0%,0.8)", // 文本的字体颜色
    headerWeight: "bold",	// 标题字重
    bodyWeight: "normal",	// 文本字重
    boldWeight: "bold",	// “bold” (b, strong, dt, th)元素的字重
    includeNormalize: true, // 是否包含normalize.css
    blockMarginBottom: 1,	// 块元素的margin-bottom，1 rhythm
}
```

### Vertical Rhythm

Vertical Rhythm（垂直的节奏），是一种排版设计思想：元素间的垂直间距保持等比例长度。

在CSS中的实现来说，设定一个基准数值（比如12px），元素的行高和margin/padding设置为基准数值的整数倍，譬如（24px/36px/48px...）。类似于将页面划分为12px高的行，将内容放置好。有规律的重复性排版，会使页面看上去干净整齐。

![img](https://zellwk.com/images/2016/why-vertical-rhythm/separation-of-72px.png)

### Compass Vertical Rhythms







## 参考资料

[基于 Lerna 管理 packages 的 Monorepo 项目最佳实践](https://zhuanlan.zhihu.com/p/76349152)

[Why is Vertical Rhythm an Important Typography Practice?](https://zellwk.com/blog/why-vertical-rhythms/)




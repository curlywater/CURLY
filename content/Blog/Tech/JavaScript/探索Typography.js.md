---
description: 通过对Typography.js的研究接触到文章排版设计思想——Vertical Rhythm。文章涉及Lerna模块管理工具简介、Vertical Rhythm介绍、Typography.js使用介绍。
---



# 探索Typography.js

起源是想为个人博客定制一个不错的文章排版，然而没有找到相关的工具，以此为契机接触到Typography.js。

根据[Typography.js官网](http://kyleamathews.github.io/typography.js/)的介绍，排版系统比较复杂，不同元素上的样式需要互相协调。更改某一元素样式，往往需要把其他元素样式也做修改。而Typography.js提供接口供开发者配置，自动生成各种元素的样式，同时保证元素整体协调展现。

出于对排版系统生成逻辑的好奇，研究了Typography.js的源码。

## Lerna

Typegraphy.js项目通过monorepo做代码管理。

monorepo即把所有相关的模块放在一个repo中的代码管理方式，单个模块可以作为package独立发布，其优点在于：

- 统一构建工具、规则约束、测试方法
- 解决依赖包冗余、版本不一致的问题
- 方便模块间互相依赖管理

Lerna是实现monorepo的一种方式，即在一个仓库下管理多个模块的工具：管理包依赖，独立发布package。

Lerna的目录结构中，所有包放置在packages目录下。所有包独立发布。



## Vertical Rhythm

Vertical Rhythm（垂直的节奏），是一种排版设计思想：元素间的垂直间距保持等比例长度。

在CSS中的实现来说，设定一个基准数值（比如24px），元素的行高和`margin`/`padding`设置为基准数值的整数倍，譬如（24px/36px/48px...）。类似于将页面划分为24px高的行，将内容放置好。有规律的重复性排版，能使页面看上去干净整齐。

![img](https://zellwk.com/images/2016/why-vertical-rhythm/separation-of-72px.png)

### Compass Vertical Rhythms

CSS对Vertical Rhythms的实现中，font-size，line-height,  margin-top/margin-bottom, padding-top/padding-bottom 是密切相关的。每一个`font-size`需要对应整数倍基准值的`line-height`，`margin/padding`也需要对应整数倍基准值的`line-height`。于是[Compass Vertical Rhythms](http://compass-style.org/reference/compass/typography/vertical_rhythm/)提供了一组计算工具：

- 首先需要指定`baseFontSize`和`baseLineHeight`，长度单位为`rem/em`这类相对单位，需要依赖`baseFontSize`计算值；`baseLineHeight`则是作为基准值存在，当`baseLineHeight`为数值时也需要依赖`font-size`转换为绝对长度；实际上在代码内部也是通过`baseLineHeight`对应的绝对长度（`baseLineHeightInPx`）进行计算的。
- `rhythm(lines, fontSize, offset)` - 计算整数倍基准值的函数，可指定`fontSize`默认和`baseFontSize`相等；
- `linesForFontSize(fontSize[, options={roundToNearestHalfLine: true}])` - 计算`fontSize`对应的`lineHeight`；
- `adjustFontSizeTo(toSize[, lines, fromSize])` - 计算`fontSize`对应`lineHeight`，返回`fontSize`和`lineHeight`的Mixin。

在typography中，作者使用的是自己编写的[compass-vertical-rhythm](https://github.com/KyleAMathews/compass-vertical-rhythm)库，可以说是简化版



## typography.js

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
  	rhythmUnit: "rem" // 【文档中未列出的隐藏属性】长度单位，默认为"rem"，可用"px","em"替代
}
```

### 实例和用法

Typegraphy是一个构造函数，构造的实例对象包括以下属性/方法：

```json
{
	options, // 传入的option
	adjustFontSizeTo(toSize[, lines, fromSize]), // 返回fontSize+lineHeight Mixin
	establishBaseline(), // 返回baseFontSize和baseLineHeight
	linesForFontSize(fontSize[, options={roundToNearestHalfLine: true}]), // 计算fontize对应的lineHeight
	rhythm(lines[, fontSize, offset]), // 快速计算line-height的倍数值
	scale(number), // (scaleRatio ** number) * baseFontSize，按值缩放，返回font-size+line-height Mixin，适合用于标题系列计算
	toJSON, // 构建style map: {element: {prop1: value1, prop2：value2}}
	toString, // 根据style map组装stylesStr
	createStyles, // 同toString，后续版本会被移除
	injectStyles,	// 将装有stylesStr的style元素插入文档或更新已有的style内容，style元素的id为typography.js。
}
```

使用示例：

``` javascript

import Typography from 'typography'

const typography = new Typography({
  baseFontSize: '18px',
  baseLineHeight: 1.45,
  headerFontFamily: ['Avenir Next', 'Helvetica Neue', 'Segoe UI', 'Helvetica', 'Arial', 'sans-serif'],
  bodyFontFamily: ['Georgia', 'serif'],
  // See below for the full list of options.
})

// Output CSS as string.
typography.toString()

// Or insert styles directly into the <head> (works well for client-only
// JS web apps.
typography.injectStyles()
```

### 主题

Typography.js已发布一些经典的主题，譬如Github主题、WordPress主题，可在http://kyleamathews.github.io/typography.js/实时查看主题效果。【P.S.】Typography.js使用monorepo做代码管理，package下的每一个主题目录作为独立模块发布，按需安装导入即可。

``` javascript
import Typography from 'typography'
import funstonTheme from 'typography-theme-funston'
funston.overrideThemeStyles = ({ rhythm }, options) => ({
  'h2,h3': {
    marginBottom: rhythm(1/2),
    marginTop: rhythm(2),
  }
})

const typography = new Typography(funstonTheme)
```



当然从零定义一个新主题也并非难事，建议借鉴某个已发布主题的代码确定需要指定的样式，以及使用一篇涵盖常用语法的Markdown文章进行调试，我使用的是Hello World: The remark Kitchen Sink[【预览效果】](https://using-remark.gatsbyjs.org/hello-world-kitchen-sink/)[【对应Markdown文件】](https://raw.githubusercontent.com/gatsbyjs/gatsby/master/examples/using-remark/src/pages/2016-04-15---hello-world-kitchen-sink/index.md)

## 参考资料

[基于 Lerna 管理 packages 的 Monorepo 项目最佳实践](https://zhuanlan.zhihu.com/p/76349152)

[Why is Vertical Rhythm an Important Typography Practice?](https://zellwk.com/blog/why-vertical-rhythms/)

[Compass Vertical Rhythms](https://zellwk.com/blog/compass-vertical-rhythm/)


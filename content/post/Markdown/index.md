---
title: Markdown
date: "2015-05-01T22:12:03.284Z"
description: "Markdown"
---

# 大标题 Heading Title1	

# [带🔗的大标题]()

# 带`Code`的大标题

## 二级标题 Heading Title2

### 三级标题 Heading Title3

#### 四级标题 Heading Title4

##### 五级标题 Heading Title5

###### 六级标题 Heading Title6

普通文本区域，就是一些普通的文本信息。

Typegraphy.js 项目通过 monorepo 做代码管理。

monorepo 即把所有相关的模块放在一个 repo 中的代码管理方式，单个模块可以作为 package 独立发布，其优点在于：

- 统一
  - 构建工具
  - 规则约束
  - 测试方法
- 解决依赖包冗余、版本不一致的问题
- 方便模块间互相依赖管理

[Compass Vertical Rhythms](http://compass-style.org/reference/compass/typography/vertical_rhythm/)提供工具方便属性计算，思路差不多是指定`baseFontSize`和`baseLineHeight`。提供一些计算函数/Mixins，例如：

1. `adjustFontSizeTo($to-size, [$lines], [$from-size])`，一个 Mixin，计算 font-size 对应的 line-height，返回 font-size 和 line-height 的 Mixin。

2. `rhythm(integer)`，一个 Function，快速计算 line-height 倍数值的方法。
3. `linesForFontSize($font-size)`，一个 Function，计算 font-size 对应的 line-height

在 typography 中，作者使用的是自己编写的[compass-vertical-rhythm](https://github.com/KyleAMathews/compass-vertical-rhythm)库，可以说是简化版，只提供`rhythm/establishBaseline/linesForFontSize/adjustFontSizeTo`四个方法。

```javascript
// 代码块
import Typography from "typography"

const typography = new Typography({
  baseFontSize: "18px",
  baseLineHeight: 1.45,
  headerFontFamily: [
    "Avenir Next",
    "Helvetica Neue",
    "Segoe UI",
    "Helvetica",
    "Arial",
    "sans-serif",
  ],
  bodyFontFamily: ["Georgia", "serif"],
  // See below for the full list of options.
})

// Output CSS as string.
typography.toString()

// Or insert styles directly into the <head> (works well for client-only
// JS web apps.
typography.injectStyles()
```

> Vertical Rhythm（垂直的节奏），是一种排版设计思想：元素间的垂直间距保持等比例长度。

---



| 方法               | 说明                    |
| ------------------ | ----------------------- |
| Math.floor(number) | 向下取整                |
| Math.round(number) | 四舍五入为整数          |
| Math.ceil(number)  | 向上取整                |
| Math.trunc(number) | 直接截取整数            |
| number.toFixed(n)  | 四舍五入到小数点后 n 位 |

$$
2^n+1
$$

### TODO

- [ ] Task1：完成个人站点 $2^1$
- [ ] Task2：输出两篇文章

![img](https://zellwk.com/images/2016/why-vertical-rhythm/separation-of-72px.png)


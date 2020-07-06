---
tags:
  - gatsby
---

# 如何使用 Gatsby 构建个人站点

![Screen Shot 2020-06-18 at 8.35.43 AM](如何使用Gatsby构建个人站点.assets/Screen Shot 2020-06-18 at 8.35.43 AM.png)

React 团队将 Gatsby 作为基于 React 搭建静态站点的首选解决方案。Gatsby 有什么特别之处呢？

- 基于 React，方便使用 React 以及生态圈中的各类组件
- 开箱即用，轻松支持最新的 Web 开发技术，譬如 Webpack 打包，ES6 编译，支持 TS，各种 CSS 方案
- 构建预渲染页面，满足快速加载和 SEO 需求；构建静态资源，直接部署至各类服务平台
- 集成 GraphQL，支持不同数据来源
- PWA 生成器

Gatsby 适用于构建内容类站点，譬如产品介绍站点[e.g. Figma](https://www.figma.com/)、帮助中心（用户手册）[e.g. Ghost Docs](https://www.gatsbyjs.org/showcase/docs.ghost.org)、开发者文档 [e.g. React JS](https://www.gatsbyjs.org/showcase/reactjs.org)、个人博客[e.g. Dan Abramov](https://overreacted.io/)。更多实例可以参见https://www.gatsbyjs.org/showcase

大致了解之后可见，想基于 React 开发个人站点，Gatsby 确实是一个直接方案。

## 预先储备

如果想对 Gatsby 的基本使用有所了解，可以阅读这篇文章[《Gatsby 概览》](./gatsby概览)，阅读官方文档后的一丢丢梳理。

看一些现有开源项目的实现

### [overreacted.io](https://github.com/gaearon/overreacted.io)

- Typegraphy.js 提供排版系统支持，各级标题、段落、列表之间协调
- 多主题实现
  - 增加`window.__setPreferredTheme`函数，供主题切换调用
    - 修改 body className
    - 更新 localStorage
  - CSS 自定义属性
  - 组件部分的主题通过局部 State 控制，增加`window.__onChangeTheme`函数，在主题更改时调用
- 多语言支持：单篇文章目录下放置不同语言版本 markdown 文件，`gatsby-node.js`中遍历所有文章生成`translationsByDirectory`

## 代码实施

由于规划的数据源结构和 overreacted.io 完全不同，即 overreacted.io 的大量逻辑部分无法复用，因此选择以[gatsby-starter-blog](https://www.gatsbyjs.org/starters/gatsbyjs/gatsby-starter-blog/)起手。

### 样式方案

文章排版样式似乎是简单又深奥，就设计的角度来说里面或许有一些规范考究。

gatsby-starter-blog依赖于Typography.js，Typography.js是基于Vertical Rhythm排版设计思想实现的一套工具，开发者可以通过Typography.js快速应用经典的文章排版，譬如Github/WordPress，可做微调也可从零快速搭建自己的主题。了解更多可以查看这篇文章[探索Typography.js](/blog/tech/javascript/探索typography.js/)。

Typography.js通过在`head`元素内插入`style`影响全局样式，如何处理应用于局部的需求？Typography.js提供`.toString()`方法返回组装完毕的样式代码，通过正则简单替换body部分，结合Styled-Component动态插入到局部组件中。

回到个人项目中，考虑到非文章相关页并不多，以及Vertical Rhythm排版设计思想应用于全局有保持一致性的优势，还是保留Typography.js的全局作用。而在局部，作为新尝试使用了Styled-Component。

###GraphQL经验总结


---
description: 阅读Gatsby文档的一点总结，Gatsby简要介绍
tags:
  - gatsby
---

# Gatsby 概览

## 项目结构

```text
|-- /.cache
|-- /plugins
|-- /public
|-- /src
    |-- /pages
    |-- /templates
    |-- /components
    |-- html.js
|-- /static
|-- gatsby-config.js
|-- gatsby-node.js
|-- gatsby-ssr.js
|-- gatsby-browser.js
```

- `.cache` - Gatsby 自动生成的内部缓存
- `plugins` - 管理本地插件
- `public` - 构建完成的最终文件，用于部署
- `static` - 静态文件，不会参与 webpack 打包过程，直接拷贝到`public`目录
- `src` - 前端源码，通过构建生成可执行静态文件
  - `pages` - 页面组件目录，Gatsby 根据该目录下的组件自动创建页面路由
  - `templates` - 页面模板组件目录，用于在`gatsby-node.js`中手动创建页面
  - `html.js` - JSX 文件，用于自定义 HTML，默认情况下使用`.cache/default-html.js`
  - \*`components` - 依照 React 推荐项目结构手动增加，普通组件目录，
- `gatsby-config.js` - 作用于 Gatsby 全局环境，譬如添加依赖插件
- `gatsby-node.js` - 作用于构建过程，譬如在构建过程中手动添加页面
- `gatsby-browser.js` - 作用于浏览器运行环境，譬如导入全局样式
- `gatsby-ssr.js` - 作用于 server-side render 过程

## 页面和布局

Gatsby 根据`src/pages`下的组件自动创建页面路由，文本将这类组件称为页面组件（Page Component）。比如组件`src/pages/index.js` and `src/pages/about.js`对应到路径`/`和`/about`。

页面通过`<Link>`组件跳转：

```javascript
import { Link } from "gatsby"
```

布局组件（`src/components/layout.js`）用于在各页面间共享`HTML`标记、样式和功能，在页面组件中使用布局组件包裹页面內容。

可以通过`gatsby-node.js`在构建过程中添加页面，自定义 createPages 接口，指定页面模板组件`src/templates/xxx.js`

```javascript
exports.createPages = ({ actions }) => {
  const { createPage } = actions

  const dogData = [
    {
      name: "Fido",
      breed: "Sheltie",
    },
    {
      name: "Sparky",
      breed: "Corgi",
    },
  ]
  dogData.forEach(dog => {
    createPage({
      path: `/${dog.name}`,
      component: require.resolve(`./src/templates/dog-template.js`),
      context: { dog },
    })
  })
}
```

## 样式方案

这里罗列一下官方支持的方案，配置方便，可按需选择，具体操作步骤[官方文档](https://www.gatsbyjs.org/docs/recipes/styling-css)已详细列出。

- 通过`gatsby-browser.js`直接导入全局样式
- 通过 Layout Component 导入全局样式
- 使用 Styled Components
- 使用 emotion
- 使用 CSS Modules
- 使用 Sass/Scss，可混合 CSS Modules 使用
- 添加本地字体
- 使用 Google Fonts
- 使用 Font Awesome

## 插件/脚手架/主题

- 插件（Plugins） - 功能补充，譬如增加 styled-component 支持、数据源读取
- 脚手架（Starters）- 针对不同业务场景的完整解决方案，譬如[个人博客](https://www.gatsbyjs.org/starters/gatsbyjs/gatsby-starter-blog/)，[购物网站](https://www.gatsbyjs.org/starters/AlexanderProd/gatsby-shopify-starter/)
- 主题（Themes）- 单独提取功能、样式作为依赖包，可组合使用

## 数据源

### 数据来源

在 Gatsby 中数据源获取是通过插件驱动的，

数据源来自本地文件系统依赖`gatsby-source-filesystem`插件，

数据源来自 wordpress API 则依赖`gatsby-source-wordpress`插件，

按数据源选择对应插件即可。

数据源插件做的事情是获取数据 -> 生成对应节点到 GraphQL 数据层

### 数据获取

构建时（build 或者 develop），Gatsby 获取数据并将其合并到 GraphQL 中，整合站点所有来源的数据

查询数据时，GraphQL 根据指定的数据结构返回数据，Gatsby 通过`props`将数据传输到组件中

同时，可以在 Gatsby 构建期间自定义数据节点到 GraphQL 数据层

```javascript
// gatsby-node.js
exports.sourceNodes = ({ actions, createNodeId, createContentDigest }) => {
  const pokemons = [
    { name: "Pikachu", type: "electric" },
    { name: "Squirtle", type: "water" },
  ]

  pokemons.forEach(pokemon => {
    const node = {
      name: pokemon.name,
      type: pokemon.type,
      id: createNodeId(`Pokemon-${pokemon.name}`),
      internal: {
        type: "Pokemon",
        contentDigest: createContentDigest(pokemon),
      },
    }
    actions.createNode(node)
  })
}
```

### 构建页面

以为本地 markdown 文件生成静态页面为例：

添加依赖以构建具体类型的数据节点

- [gatsby-source-filesystem](https://www.gatsbyjs.org/packages/gatsby-source-filesystem)：根据文件系统创建文件节点
- [gatsby-transformer-remark](https://www.gatsbyjs.org/packages/gatsby-transformer-remark/)：解析文件节点，转换出 Markdown 的数据节点，譬如提取`html`、`frontmatter`

```javascript
// gatsby-configs.js
module.exports = {
  plugins: [
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `${__dirname}/src/content`,
      },
    },
  ],
}
```

构建过程中手动创建页面

```javascript
// gatsby-node.js
const path = require(`path`)

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions

  const result = await graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              path
            }
          }
        }
      }
    }
  `)
  if (result.errors) {
    console.error(result.errors)
  }

  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.frontmatter.path,
      component: path.resolve(`src/templates/post.js`),
    })
  })
}
```

## 使用 GraphQL 查询数据

### 页面组件

在页面组件中直接`export`query 常量，GraphQL 的查询语句即可被执行

```jsx
// src/pages/index.js
import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
// 导出常量query
export const query = graphql`
  query HomePageQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`
const IndexPage = ({ data }) => (
  <Layout>
    <h1>{data.site.siteMetadata.title}</h1>
  </Layout>
)
export default IndexPage
```

### 普通组件

在普通组件中需要使用 StaticQuery 组件或者 useStaticQuery hook

```javascript
// src/components/header.js
import React from "react"
import { StaticQuery, graphql } from "gatsby"

export default function Header() {
  return (
    <StaticQuery
      query={graphql`
        query HeadingQuery {
          site {
            siteMetadata {
              title
            }
          }
        }
      `}
      render={data => (
        <header>
          <h1>{data.site.siteMetadata.title}</h1>
        </header>
      )}
    />
  )
}
```

```javascript
// 使用useStaticQuery hook实现
import React from "react"
import { useStaticQuery, graphql } from "gatsby"
const NonPageComponent = () => {
  const data = useStaticQuery(graphql`
    query NonPageQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)
  return (
    <h1>
      Querying title from NonPageComponent: {data.site.siteMetadata.title}{" "}
    </h1>
  )
}
export default NonPageComponent
```

### GraphQL 查询语句

可通过http://localhost:8000/___graphql调试GraphQL语句

**查询结果数量限制**

```GraphQL
{
  allSitePage(limit: 3) {
    edges {
      node {
        id
        path
      }
    }
  }
}
```

**查询结果排序**

```GraphQL
{
  allSitePage(sort: {fields: path, order: ASC}) {
    edges {
      node {
        id
        path
      }
    }
  }
}
```

**筛选语句**

```graghQL
{
  allMarkdownRemark(filter: {frontmatter: {categories: {eq: "magical creatures"}}}) {
    edges {
      node {
        frontmatter {
          title
          categories
        }
      }
    }
  }
}
```

**使用 fragment 创建全局复用片段**

创建成功即可全局使用

```javascript
export const query = graphql`
  fragment SiteInformation on Site {
    title
    description
  }
`
```

## 使用图片

#### 手动引入图片资源

适用于手动引入长期静态的资源，比如站点 logo 之类

- Gatsby 已预先配置好对应的 webpack，会将`src`下在用的图片复制到`public`中，并提供动态路径给 img 元素
- 引用`static`下的图片，直接使用图片相对`static`的路径即可

#### 通过 GraphQL 获取图片数据

适用于引入动态图片资源，比如文章插图

##### 强化图片处理

追加插件，支持图片处理（调整大小、裁剪），自适应支持

- [gatsby-plugin-sharp](https://www.gatsbyjs.org/packages/gatsby-plugin-sharp)插件 - 提供图片处理的基础功能集，基于[Sharp](https://github.com/lovell/sharp)图像处理库，需要和其他插件结合使用
- [gatsby-transformer-sharp](https://www.gatsbyjs.org/packages/gatsby-transformer-sharp)插件 - 将图片文件节点转换为 ImageSharp 节点
- [gatsby-image](https://www.gatsbyjs.org/packages/gatsby-image/) 组件 - 提供对应接口，接收 GraphQL 返回的数据，加以应用

##### 使用示例

```javascript
import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"

export default ({ data }) => (
  <div>
    <h1>Hello gatsby-image</h1>
    <Img fixed={data.file.childImageSharp.fixed} />
  </div>
)

export const query = graphql`
  query {
    file(relativePath: { eq: "blog/avatars/kyle-mathews.jpeg" }) {
      childImageSharp {
        # Specify the image processing specifications right in the query.
        # Makes it trivial to update as your page's design changes.
        fixed(width: 125, height: 125) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`
```

## 数据转换

#### 转换 Markdown

依赖`gatsby-transformer-remark`插件，根据 markdown 文本节点内容转换出 markdown 节点

```javascript
// gatsby-config.js
plugins: [
  // not shown: gatsby-source-filesystem for creating nodes to transform
  `gatsby-transformer-remark`
],
```

```jsx
export const query = graphql`
  query {
    allMarkdownRemark {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
          }
          excerpt
        }
      }
    }
  }
`
```

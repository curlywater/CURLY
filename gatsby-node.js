const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(
    `
      {
        allDirectory(filter: { relativeDirectory: { eq: "" } }) {
          nodes {
            id
            name
            relativePath
          }
        }
        site {
          siteMetadata {
            entry {
              directory
              type
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    throw result.errors
  }

  const data = result.data
  const configEntries = data.site.siteMetadata.entry
  const fsEntries = data.allDirectory.nodes
  const fsEntriesMap = new Map(
    fsEntries.map(node => [node.name.toLowerCase(), node])
  )

  const homeEntry = {
    id: "home",
    name: "Home",
    type: "Home",
    relativePath: "/",
    active: true,
  }
  const entries = configEntries.reduce(
    (entries, entry) => {
      const category = entry.directory.toLowerCase()
      const fsEntry = fsEntriesMap.get(category)
      if (fsEntry) {
        return entries.concat([
          {
            id: fsEntry.id,
            name: entry.title || fsEntry.name,
            type: entry.type || "Articles",
            relativePath: `/${category}`,
            category,
          },
        ])
      } else {
        return entries
      }
    },
    [{ ...homeEntry }]
  )

  // Create index page.
  createPage({
    path: "/",
    component: path.resolve("./src/templates/index.tsx"),
    context: {
      entries,
    },
  })
  // Create 404 page.
  createPage({
    path: "/404",
    component: path.resolve("./src/templates/index.tsx"),
    context: {
      entries: [{ ...homeEntry }],
    },
  })

  entries.forEach(async entry => {
    const { type: entryType, category, relativePath, name } = entry
    if (entryType === "Articles") {
      // Create blog list.
      createPage({
        path: relativePath,
        component: path.resolve("./src/templates/blog-index.tsx"),
        context: {
          name,
          category,
          subcategory: "*",
        },
      })

      const result = await graphql(`
        {
          allMarkdownRemark(
            filter: { fields: { category: {eq: "${category}"} }}
          ) {
            edges {
              node {
                fields {
                  slug
                }
              }
            }
            distinct(field: fields___subcategory)
          }
        }
      `)

      if (result.errors) {
        throw result.errors
      }

      // Create subcategory blog list
      const subcategories = result.data.allMarkdownRemark.distinct
      subcategories.forEach(subcategory =>
        createPage({
          path: `${relativePath}/${subcategory}`,
          component: path.resolve("./src/templates/blog-index.tsx"),
          context: {
            name,
            category,
            subcategory,
          },
        })
      )

      // Create blog posts pages.
      const posts = result.data.allMarkdownRemark.edges
      posts.forEach(({ node: { fields: { slug } } }) =>
        createPage({
          path: slug,
          component: path.resolve("./src/templates/post.tsx"),
          context: {
            slug,
          },
        })
      )
    } else if (entryType === "Gallery") {
      // Create gallery index  pages
    }
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const fileNode = getNode(node.parent)
    const directory = fileNode.relativeDirectory.toLowerCase().split(path.sep)

    const slug = createFilePath({ node, getNode }).toLowerCase()
    createNodeField({
      name: `slug`,
      node,
      value: slug,
    })
    createNodeField({
      name: `date`,
      node,
      value: fileNode.modifiedTime,
    })
    createNodeField({
      name: `title`,
      node,
      value: fileNode.name,
    })
    createNodeField({
      name: `category`,
      node,
      value: directory[0],
    })
    createNodeField({
      name: `column`,
      node,
      value: directory[1],
    })
    createNodeField({
      name: `subcategory`,
      node,
      value: directory[2],
    })
  }
}

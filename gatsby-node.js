const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions

  createRedirect({
    fromPath: "/404/",
    toPath: "/",
    isPermanent: true,
    redirectInBrowser: true,
  })

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

  const entries = configEntries.reduce((collection, entry) => {
    const directoryName = entry.directory.toLowerCase()
    const fsEntry = fsEntriesMap.get(directoryName)
    if (fsEntry) {
      return collection.concat([
        {
          id: fsEntry.id,
          name: entry.title || fsEntry.name,
          type: entry.type || "Articles",
          relativePath: directoryName,
        },
      ])
    } else {
      return collection
    }
  }, [])
  // Create index page.
  createPage({
    path: "/",
    component: path.resolve("./src/templates/index.tsx"),
    context: {
      entries,
    },
  })
  // Create blog list / gallery index  pages.
  entries.forEach(async entry => {
    const { type: entryType, relativePath, name } = entry
    const categoryRegex = `/^\/${relativePath}/`
    if (entryType === "Articles") {
      createPage({
        path: `/${relativePath}`,
        component: path.resolve("./src/templates/blog-index.tsx"),
        context: {
          name,
          categoryRegex,
        },
      })

      const result = await graphql(`
        {
          allMarkdownRemark(
            filter: { fields: { slug: { regex: "${categoryRegex}" } } }
          ) {
            edges {
              node {
                fields {
                  slug
                }
              }
            }
          }
        }
      `)

      if (result.errors) {
        throw result.errors
      }

      // Create blog posts pages.
      const posts = result.data.allMarkdownRemark.edges
      posts.forEach(post => {
        const slug = post.node.fields.slug

        createPage({
          path: slug,
          component: path.resolve("./src/templates/post.tsx"),
          context: {
            slug,
          },
        })
      })
    } else if (entryType === "Gallery") {
    }
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const fileNode = getNode(node.parent)
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
  }
}

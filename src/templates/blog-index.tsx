import React from "react"
import { PageProps, Link, graphql } from "gatsby"

import Layout from "../components/Layout"
import SEO from "../components/SEO"
import { rhythm } from "../utils/typography"

type DataProps = {
  allMarkdownRemark: {
    edges: [
      {
        node: {
          id: string
          timeToRead: string
          fields: {
            slug: string
            title: string
            date: string
          }
          headings: [{ value: string }]
          excerpt: string
        }
      }
    ]
  }
}

type PageContextType = {
  name: string
  categoryRegex: string
}

const BlogIndex: React.FC<PageProps<DataProps, PageContextType>> = ({
  data,
  location,
  pageContext,
}) => {
  const posts = data.allMarkdownRemark.edges

  return (
    <Layout locationPath={location.pathname}>
      <SEO title={pageContext.name} />
      {posts.map(({ node }) => {
        const title = node.headings[0]?.value || node.fields.title
        return (
          <article key={node.id}>
            <header>
              <h3
                style={{
                  marginBottom: rhythm(1 / 4),
                  marginTop: rhythm(2),
                }}
              >
                <Link to={node.fields.slug}>{title}</Link>
              </h3>
            </header>
            <section>
              <p
                dangerouslySetInnerHTML={{
                  __html: node.excerpt,
                }}
                style={{
                  userSelect: "text",
                  marginBottom: 0,
                }}
              />
            </section>
            <section>
              <small>
                {node.fields.date} • {node.timeToRead} min read
              </small>
            </section>
          </article>
        )
      })}
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query($categoryRegex: String) {
    allMarkdownRemark(
      sort: { fields: fields___date, order: DESC }
      filter: { fields: { slug: { regex: $categoryRegex } } }
    ) {
      edges {
        node {
          id
          fields {
            date(formatString: "MMMM DD, YYYY")
            slug
            title
          }
          headings(depth: h1) {
            value
          }
          excerpt(pruneLength: 100)
          timeToRead
        }
      }
    }
  }
`

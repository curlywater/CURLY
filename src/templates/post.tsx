import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/Layout"
import SEO from "../components/SEO"
import { rhythm, scale } from "../utils/typography"

const BlogPostTemplate = ({ data, location }) => {
  const post = data.markdownRemark
  const title = post.headings[0]?.value || post.fields.title

  return (
    <Layout locationPath={location.pathname}>
      <SEO title={title} description={post.excerpt} />
      <article style={{ userSelect: "text" }}>
        <header style={{ textAlign: "center" }}>
          <h1
            style={{
              marginTop: rhythm(2),
            }}
          >
            {title}
          </h1>
          <p
            style={{
              ...scale(-1 / 5),
              display: `block`,
              marginBottom: rhythm(1),
            }}
          >
            {post.fields.date} • {post.timeToRead} min read
          </p>
          <hr />
        </header>
        <section
          dangerouslySetInnerHTML={{
            __html: post.html.replace(/(.*<\/h1>)/, ""),
          }}
        />
        <hr />
        <footer></footer>
        {/* <aside>
          <section
            dangerouslySetInnerHTML={{
              __html: post.tableOfContents,
            }}
          ></section>
        </aside> */}
      </article>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
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
      tableOfContents
    }
  }
`

import React from "react"
import { graphql } from "gatsby"
import styled from "styled-components"

import Layout from "../components/Layout"
import SEO from "../components/SEO"
import { rhythm, scale, adjustFontSizeTo } from "../utils/typography"

const StyledTOC = styled.aside`
  flex: 0 0 auto;
  padding: ${rhythm(1)} 0;
  padding-left: ${rhythm(1)};
  section {
    position: relative;
    overflow-x: hidden;
    overflow-y: auto;
    overflow-y: overlay;
    ul {
      list-style: none;
      margin-left: ${rhythm(1 / 2)};
      li {
        ${adjustFontSizeTo("12px")};
        word-break: keep-all;
      }
      li > p {
        position: relative;
        &:before {
          content: "‣";
          position: absolute;
          color: var(--text-secondary);
          transform: translateX(-200%) rotate(90deg);
          cursor: pointer;
        }
      }
      li > a,
      p > a {
        color: var(--text-secondary);
        text-decoration: none;
      }
    }
  }
`

const StyledArticle = styled.article`
  flex: 1 1 auto;
  user-select: "text";
`

const BlogPostTemplate = ({ data, location }) => {
  const post = data.markdownRemark
  const title = post.headings[0]?.value || post.fields.title

  return (
    <Layout locationPath={location.pathname} mainStyle={{ display: "flex" }}>
      <SEO title={title} description={post.excerpt} />
      <StyledArticle>
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
              color: "var(--text-secondary)",
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
      </StyledArticle>
      <StyledTOC>
        <section
          dangerouslySetInnerHTML={{
            __html: post.tableOfContents,
          }}
        ></section>
      </StyledTOC>
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

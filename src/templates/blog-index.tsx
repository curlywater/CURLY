import React from "react"
import { PageProps, Link, graphql } from "gatsby"
import styled from "styled-components"

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
            category: string
            subcategory: string | null
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
  category: string
  subcategory: string
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
            <section style={{ color: "var(--text-secondary)" }}>
              <small>
                {node.fields.date}&nbsp;&nbsp;•&nbsp;&nbsp;{node.timeToRead} min
                read
              </small>
              {pageContext.subcategory == "*"
                ? renderSubCategory(node.fields.subcategory)
                : null}
            </section>
          </article>
        )
      })}
    </Layout>
  )
}

const StyledLink = styled(Link)`
  color: var(--text-secondary);
`

function renderSubCategory(subcategory) {
  if (subcategory) {
    return (
      <small>
        &nbsp;&nbsp;•&nbsp;&nbsp;
        <StyledLink to={`/${subcategory}`}>
          {subcategory[0].toUpperCase() + subcategory.slice(1)}
        </StyledLink>
      </small>
    )
  } else {
    return null
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query($category: String!, $subcategory: String!) {
    allMarkdownRemark(
      sort: { fields: fields___date, order: DESC }
      filter: {
        fields: {
          category: { eq: $category }
          subcategory: { glob: $subcategory }
        }
      }
    ) {
      edges {
        node {
          id
          fields {
            date(formatString: "MMMM DD, YYYY")
            slug
            title
            category
            column
            subcategory
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

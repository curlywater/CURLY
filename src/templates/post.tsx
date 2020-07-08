import React from "react"
import { Link, PageProps, graphql } from "gatsby"
import styled from "styled-components"

import Layout from "../components/Layout"
import SEO from "../components/SEO"
import { rhythm, scale, adjustFontSizeTo } from "../utils/typography"

type DataProps = {
  markdownRemark: {
    id: string
    html: string
    fields: {
      date: string
      slug: string
      category: string
      subcategory: string | null
    }
    excerpt: string
    timeToRead: number
    tableOfContents: string
  }
}
type PageContextProps = {
  title: string
  slug: string
  relatedPosts: [
    {
      id: string
      slug: string
      title: string
    }
  ]
}

const StyledTOC = styled.aside`
  position: absolute;
  right: 0;
  top: 0;
  transform: translateX(100%);
  padding: ${rhythm(2)} 0;
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

const StyledArticleHeader = styled.header`
  text-align: center;
  margin-top: ${rhythm(2)};
  margin-bottom: ${rhythm(2)};
`

const StyledArticleFooter = styled.footer`
  margin-top: ${rhythm(1)};
  margin-bottom: ${rhythm(1)};
`

const StyledRelatedPosts = styled.ul`
  list-style: none;
  margin-left: 0;
`

const BlogPostTemplate: React.FC<PageProps<DataProps, PageContextProps>> = ({
  data,
  location,
  pageContext,
}) => {
  const post = data.markdownRemark

  return (
    <Layout mainStyle={{ position: "relative" }}>
      <SEO title={pageContext.title} description={post.excerpt} />
      <article>
        <StyledArticleHeader>
          <h1>{pageContext.title}</h1>
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
        </StyledArticleHeader>
        <section
          dangerouslySetInnerHTML={{
            __html: post.html.replace(/(.*<\/h1>)/, ""),
          }}
        />
        <StyledArticleFooter>
          <hr />
          <h3>Related Post</h3>
          <StyledRelatedPosts>
            {pageContext.relatedPosts?.map(({ id, title, slug }) => (
              <li key={id}>
                <Link to={slug}>{title}</Link>
              </li>
            ))}
            {renderRelatedCategory(post.fields)}
          </StyledRelatedPosts>
        </StyledArticleFooter>
      </article>
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

function renderRelatedCategory({ category, subcategory }) {
  if (subcategory) {
    return (
      <li>
        <Link
          to={`/${category}/${subcategory}`}
          style={{ textTransform: "capitalize" }}
        >
          → 更多
          {subcategory}
          相关文章
        </Link>
      </li>
    )
  } else {
    return null
  }
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
        category
        subcategory
      }
      excerpt(pruneLength: 100)
      timeToRead
      tableOfContents
    }
  }
`

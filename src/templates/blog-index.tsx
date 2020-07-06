import React from "react"
import { PageProps, Link, graphql } from "gatsby"
import styled from "styled-components"
import { Menu, Dropdown } from "antd"

import Layout from "../components/Layout"
import SEO from "../components/SEO"
import { rhythm, adjustFontSizeTo } from "../utils/typography"

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

const LayoutHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const DropdownTrigger = styled.a`
  color: var(--title-primary);
  user-select: none;
  cursor: pointer;
  ${adjustFontSizeTo("18px")};
  display: flex;
  align-items: center;
`

const BlogIndex: React.FC<PageProps<DataProps, PageContextType>> = ({
  data,
  location,
  pageContext,
}) => {
  const posts = data.allMarkdownRemark.edges

  return (
    <Layout renderHeader={renderLayoutHeader}>
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
        <StyledLink to={`./${subcategory}`}>
          {subcategory[0].toUpperCase() + subcategory.slice(1)}
        </StyledLink>
      </small>
    )
  } else {
    return null
  }
}

function renderLayoutHeader(headerLogo) {
  const menu = (
    <Menu>
      <Menu.Item disabled>disabled</Menu.Item>
      <Menu.Item key="1">one</Menu.Item>
      <Menu.Item key="2">two</Menu.Item>
    </Menu>
  )
  return (
    <LayoutHeader>
      {headerLogo}
      <Dropdown overlay={menu} trigger={["click"]}>
        <DropdownTrigger>
          <svg
            style={{ marginRight: "4px" }}
            width="20"
            height="21"
            viewBox="0 0 20 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M7.5 13.625C7.5 13.4592 7.56585 13.3003 7.68306 13.1831C7.80027 13.0658 7.95924 13 8.125 13H11.875C12.0408 13 12.1997 13.0658 12.3169 13.1831C12.4342 13.3003 12.5 13.4592 12.5 13.625C12.5 13.7908 12.4342 13.9497 12.3169 14.0669C12.1997 14.1842 12.0408 14.25 11.875 14.25H8.125C7.95924 14.25 7.80027 14.1842 7.68306 14.0669C7.56585 13.9497 7.5 13.7908 7.5 13.625ZM5 9.875C5 9.70924 5.06585 9.55027 5.18306 9.43306C5.30027 9.31585 5.45924 9.25 5.625 9.25H14.375C14.5408 9.25 14.6997 9.31585 14.8169 9.43306C14.9342 9.55027 15 9.70924 15 9.875C15 10.0408 14.9342 10.1997 14.8169 10.3169C14.6997 10.4342 14.5408 10.5 14.375 10.5H5.625C5.45924 10.5 5.30027 10.4342 5.18306 10.3169C5.06585 10.1997 5 10.0408 5 9.875ZM2.5 6.125C2.5 5.95924 2.56585 5.80027 2.68306 5.68306C2.80027 5.56585 2.95924 5.5 3.125 5.5H16.875C17.0408 5.5 17.1997 5.56585 17.3169 5.68306C17.4342 5.80027 17.5 5.95924 17.5 6.125C17.5 6.29076 17.4342 6.44973 17.3169 6.56694C17.1997 6.68415 17.0408 6.75 16.875 6.75H3.125C2.95924 6.75 2.80027 6.68415 2.68306 6.56694C2.56585 6.44973 2.5 6.29076 2.5 6.125Z"
              fill="#243127"
            />
          </svg>
          所有文章
        </DropdownTrigger>
      </Dropdown>
    </LayoutHeader>
  )
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

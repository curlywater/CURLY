import React, { useState, useMemo } from "react"
import { PageProps, Link, graphql } from "gatsby"
import styled from "styled-components"
import { FormControl, Select, MenuItem } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

import Layout from "../components/Layout"
import SEO from "../components/SEO"
import { rhythm } from "../utils/typography"

type DataProps = {
  allMarkdownRemark: {
    distinct: []
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
            column: string
            subcategory: string | null
          }
          frontmatter: {
            description: string | null
          }
          headings: [{ value: string }]
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

const useStyles = makeStyles(theme => ({
  formControl: {
    minWidth: 120,
  },
  select: {
    textTransform: "capitalize",
  },
  menuItem: {
    textTransform: "capitalize",
  },
}))

const BlogIndex: React.FC<PageProps<DataProps, PageContextType>> = ({
  data,
  location,
  pageContext,
}) => {
  const classes = useStyles()
  const posts = data.allMarkdownRemark.edges
  const columns = data.allMarkdownRemark.distinct

  const [column, setColumn] = useState("")

  const handleChange = event => {
    setColumn(event.target.value)
  }

  const ColumnFilter = (
    <FormControl className={classes.formControl}>
      <Select
        value={column}
        onChange={handleChange}
        displayEmpty
        className={classes.select}
        MenuProps={{ className: classes.menuItem }}
      >
        <MenuItem value="">所有文章</MenuItem>
        {columns.map(column => (
          <MenuItem key={column} value={column}>
            {column}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )

  return (
    <Layout locationPath={location.pathname} headerComponent={ColumnFilter}>
      <SEO title={pageContext.name} />
      {(column
        ? posts.filter(({ node }) => node.fields.column === column)
        : posts
      ).map(({ node }) => {
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
                  __html: node.frontmatter.description,
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
              {renderSubCategory(node.fields.subcategory)}
            </section>
          </article>
        )
      })}
    </Layout>
  )
}

const StyledLink = styled(Link)`
  color: var(--text-secondary);
  text-transform: capitalize;
`

function renderSubCategory(subcategory) {
  if (subcategory) {
    return (
      <small>
        &nbsp;&nbsp;•&nbsp;&nbsp;
        <StyledLink to={`./${subcategory}`}>{subcategory}</StyledLink>
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
            date(formatString: "YYYY-MM-DD")
            slug
            title
            category
            column
            subcategory
          }
          headings(depth: h1) {
            value
          }
          frontmatter {
            description
          }
          timeToRead
        }
      }
      distinct(field: fields___column)
    }
  }
`

// If you don't want to use TypeScript you can delete this file!
import React from "react"
import { PageProps, Link, graphql } from "gatsby"
import styled from "styled-components"

import Layout from "../components/Layout"
import SEO from "../components/SEO"
import { scale, adjustFontSizeTo } from "../utils/typography"

type directoryNodeProps = {
  id: string
  name: string
  relativePath: string
}
type DataProps = {
  site: {
    siteMetadata: {
      title: string
    }
  }
}
type PageContextProps = {
  entries: [directoryNodeProps]
}

const StyledTitle = styled.h1`
  ${scale(3)};
  font-weight: normal;
  letter-spacing: 0.3em;
  text-align: center;
  margin-top: 0;
  margin-bottom: 0;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -100%);
`
const StyledNav = styled.nav`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, 150%);
  & > ul {
    margin: 0;
    & > li {
      margin: 0;
      display: inline-block;
    }
  }
`

const StyledLink = styled(Link)`
  ${adjustFontSizeTo("14px")};
  text-decoration: none;
  color: var(--title-secondary);
  text-transform: uppercase;
  letter-spacing: 4px;
  margin-left: 2.5em;
  margin-right: 2.5em;
  &:hover,
  &.active {
    color: var(--title-primary);
    transition: 0.3s color ease-in-out;
  }
  &.active:hover {
    opacity: 1;
  }
`

const Home: React.FC<PageProps<DataProps, PageContextProps>> = ({
  data,
  pageContext,
}) => (
  <Layout>
    <SEO lang="en" />
    <>
      <StyledTitle>{data.site.siteMetadata.title}</StyledTitle>
      <StyledNav>
        <ul>
          {pageContext.entries.map(
            ({ id, name, relativePath }: directoryNodeProps) => (
              <li key={id}>
                <StyledLink
                  tabIndex={-1}
                  to={relativePath}
                  activeClassName="active"
                >
                  {name}
                </StyledLink>
              </li>
            )
          )}
        </ul>
      </StyledNav>
    </>
  </Layout>
)

export default Home

export const query = graphql`
  {
    site {
      siteMetadata {
        title
      }
    }
  }
`

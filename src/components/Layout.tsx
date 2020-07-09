import React, { ReactElement } from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"

import { options, rhythm, adjustFontSizeTo } from "../utils/typography"

type ComponentProps = {
  title?: string
  mainStyle?: object
  headerComponent?: ReactElement | null
  children: any
  locationPath?: string
}

const StyledLayout = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: ${rhythm(26)};
  width: 80%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  & > main {
    flex: 1;
  }
`

const StyledLayoutHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const StyledHeaderLogo = styled.h1`
  letter-spacing: 0.1em;
  ${adjustFontSizeTo("42px")};
  margin-top: ${rhythm(1)};
  & > a {
    &: hover {
      opacity: 1;
    }
  }
`

const StyledFooter = styled.footer`
  font-family: ${options.headerFontFamily.join(",")};
  ${adjustFontSizeTo("10px")};
  margin-top: ${rhythm(1)};
  margin-bottom: ${rhythm(0.5)};
  text-align: center;
`

const Layout: React.FC<ComponentProps> = ({
  headerComponent,
  locationPath,
  mainStyle,
  children,
}) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
        }
        pathPrefix
      }
    }
  `)

  const isHomePage = `${data.site.pathPrefix}/` === locationPath
  const headerLogo: ReactElement = (
    <StyledHeaderLogo>
      <Link to={`/`}>{data.site.siteMetadata.title}</Link>
    </StyledHeaderLogo>
  )

  return (
    <StyledLayout>
      <StyledLayoutHeader>
        {isHomePage ? null : headerLogo}
        {headerComponent}
      </StyledLayoutHeader>
      <main style={mainStyle}>{children}</main>
      <StyledFooter>{data.site.siteMetadata.description}</StyledFooter>
    </StyledLayout>
  )
}

export default Layout

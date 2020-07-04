import React, { ReactElement } from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"

import { options, rhythm, adjustFontSizeTo } from "../utils/typography"

type ComponentProps = {
  title?: string
  mainStyle?: object
  children: any
  locationPath: string
}

const StyledLayout = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: ${rhythm(30)};
  width: 80%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  & > main {
    flex: 1;
  }
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

  const dirName = locationPath.match(
    new RegExp(`${data.site.pathPrefix}(?:$|/([^/]+))`)
  )?.[1]
  let header: ReactElement = null

  if (dirName === "blog") {
    header = (
      <StyledHeaderLogo>
        <Link to={`/`}>{data.site.siteMetadata.title}</Link>
      </StyledHeaderLogo>
    )
  }

  return (
    <StyledLayout>
      <header>{header}</header>
      <main style={mainStyle}>{children}</main>
      <StyledFooter>{data.site.siteMetadata.description}</StyledFooter>
    </StyledLayout>
  )
}

export default Layout

import React, { ReactElement } from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

import { rhythm } from "../utils/typography"

type ComponentProps = {
  title?: string
  children: any
  locationPath: string
}

const Layout: React.FC<ComponentProps> = ({
  locationPath,
  title,
  children,
}) => {
  const dirName = locationPath.match(
    new RegExp(`${__PATH_PREFIX__}(?:$|/([^/]+))`)
  )?.[1]
  let header: ReactElement = null

  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          description
        }
      }
    }
  `)

  if (dirName === "blog") {
    header = (
      <h1>
        <Link
          style={{
            boxShadow: `none`,
            color: `inherit`,
          }}
          to={`/`}
        >
          {title}
        </Link>
      </h1>
    )
  }

  return (
    <div
      style={{
        marginLeft: `auto`,
        marginRight: `auto`,
        maxWidth: rhythm(30),
        padding: `${rhythm(3 / 4)}`,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <header>{header}</header>
      <main
        style={{
          flex: 1,
        }}
      >
        {children}
      </main>
      <footer
        className="footnote"
        style={{
          fontSize: "10px",
          textAlign: "center",
        }}
      >
        {data.site.siteMetadata.description}
      </footer>
    </div>
  )
}

export default Layout

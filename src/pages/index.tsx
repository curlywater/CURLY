// If you don't want to use TypeScript you can delete this file!
import React from "react"
import { PageProps, Link, graphql } from "gatsby"

import Layout from "../components/Layout"
import SEO from "../components/SEO"
import { rhythm, scale } from "../utils/typography"

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
  allDirectory: {
    nodes: [directoryNodeProps]
  }
}

const Home: React.FC<PageProps<DataProps>> = ({ data, location }) => (
  <Layout locationPath={location.pathname}>
    <SEO lang="en" />
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        marginTop: 0,
      }}
    >
      <h1
        style={{
          fontWeight: 500,
          ...scale(2.2),
          letterSpacing: "0.2em",
          textAlign: "center",
          marginTop: 0,
        }}
      >
        {data.site.siteMetadata.title}
      </h1>
      <nav>
        <ul
          style={{
            listStyle: "none",
            margin: 0,
            textAlign: "center",
          }}
        >
          {data.allDirectory.nodes.map(
            ({ id, name, relativePath }: directoryNodeProps) => (
              <li
                key={id}
                style={{
                  display: "inline-block",
                  margin: `0 ${rhythm(1 / 2)}`,
                }}
              >
                <Link
                  to={relativePath}
                  style={{
                    boxShadow: "none",
                    textTransform: "uppercase",
                    letterSpacing: "0.2em",
                  }}
                >
                  {name}
                </Link>
              </li>
            )
          )}
        </ul>
      </nav>
    </div>
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
    allDirectory(filter: { relativeDirectory: { eq: "" } }) {
      nodes {
        id
        name
        relativePath
      }
    }
  }
`

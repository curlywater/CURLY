module.exports = {
  siteMetadata: {
    title: `CURLY`,
    author: {
      name: `Curly Water`,
      summary: `Code & Music & Life`,
    },
    description: `The Personal Site By Curly Water.`,
    siteUrl: `https://https://curlywater.netlify.app/`,
    social: {
      twitter: `@Curly_Water`,
    },
    lang: "zh-Hans",
    entry: [
      {
        directory: "Blog",
        type: "Articles",
      },
    ],
  },
  plugins: [
    `gatsby-plugin-material-ui`,
    "gatsby-plugin-styled-components",
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content`,
        name: `content`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
          `gatsby-remark-katex`,
          {
            resolve: "gatsby-remark-autolink-headers",
            icon: false,
          },
          {
            resolve: "gatsby-remark-external-links",
            options: {
              target: "_blank",
            },
          },
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        //trackingId: `ADD YOUR TRACKING ID HERE`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `CURLY`,
        short_name: `CURLY`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#73BB94`,
        display: `minimal-ui`,
        icon: `src/images/favicon.png`,
        theme_color_in_head: false,
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
        omitGoogleFont: true,
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}

const BASE_FONT_SIZE = "18px"
const BASE_LINE_HEIGHT = 1.75
const blockMarginBottom = 0.8 / BASE_LINE_HEIGHT
const HEADER_FONT_FAMILY = [
  "montserrat",
  "PingFang SC",
  "Microsoft YaHei",
  "sans-serif",
]
const BODY_FONT_FAMILY = [
  "Roboto",
  "PingFang SC",
  "Microsoft YaHei",
  "sans-serif",
]

export default {
  title: "Curly",
  baseFontSize: BASE_FONT_SIZE,
  baseLineHeight: BASE_LINE_HEIGHT,
  scaleRatio: 2,
  headerFontFamily: HEADER_FONT_FAMILY,
  bodyFontFamily: BODY_FONT_FAMILY,
  headerColor: "var(--title-primary)",
  bodyColor: "var(--text-primary)",
  headerWeight: 700,
  bodyWeight: 400,
  boldWeight: 700,
  includeNormalize: true,
  blockMarginBottom,

  overrideStyles: ({ adjustFontSizeTo, scale, rhythm }, options) => {
    return {
      // Link styles
      a: {
        color: "var(--theme)",
        textDecoration: "underline",
      },
      "h1 a, h2 a, h3 a, h4 a, h5 a, h6 a, a.custom-link": {
        color: "inherit",
        textDecoration: "none",
      },
      "a:not(.gatsby-resp-image-link):hover,a:not(.gatsby-resp-image-link):active": {
        opacity: 0.85,
      },
      "a.gatsby-resp-image-link": {
        boxShadow: "none",
      },
      // These two are for gatsby-remark-autolink-headers:
      "a.anchor": {
        boxShadow: "none",
      },
      'a.anchor svg[aria-hidden="true"]': {
        stroke: "var(--theme)",
      },
      // List styles
      ul: {
        listStyle: "disc",
      },

      ".task-list-item": {
        listStyle: "none",
        marginLeft: rhythm(-1),
      },
      // Header styles
      h1: {
        ...scale(1.8),
      },
      h2: {
        ...scale(1),
      },
      h3: {
        ...scale(4 / 5),
      },
      h4: {
        ...scale(3 / 5),
      },
      h5: {
        ...scale(2 / 5),
      },
      h6: {
        ...scale(1 / 5),
      },
      "h1,h2": {
        marginTop: rhythm(2),
        marginBottom: rhythm(1 / 2),
      },
      "h3, h4": {
        marginTop: rhythm(1),
        marginBottom: rhythm(1 / 4),
      },
      "h5, h6": {
        marginTop: rhythm(1 / 2),
        marginBottom: rhythm(1 / 8),
      },
      "h1 code, h2 code, h3 code, h4 code, h5 code, h6 code": {
        fontSize: "inherit",
      },
      // Blockquote styles.
      blockquote: {
        color: "var(--blockquote-color)",
        borderLeft: "2px solid var(--blockquote-color)",
        padding: `${rhythm(0.5)} ${rhythm(1)}`,
        marginLeft: 0,
        marginRight: 0,
        marginTop: blockMarginBottom,
      },
      "blockquote > :last-child": {
        marginBottom: 0,
      },
      "blockquote cite": {
        ...adjustFontSizeTo(options.baseFontSize),
        color: options.bodyColor,
        fontStyle: "normal",
        fontWeight: options.bodyWeight,
      },
      "blockquote cite:before": {
        content: '"— "',
      },
      // hr
      hr: {
        background: "var(--line)",
      },
    }
  },
}

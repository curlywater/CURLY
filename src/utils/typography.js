import Typography from "typography"
import theme from "./typography-theme-curly"

const typography = new Typography(theme)
// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles()
}

export default typography
export const options = typography.options
export const rhythm = typography.rhythm
export const scale = typography.scale
export const adjustFontSizeTo = typography.adjustFontSizeTo

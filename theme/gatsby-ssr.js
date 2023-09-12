/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-ssr/
 */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const ssrImport = require('./dist/gatsbySSR')

export const onRenderBody = ssrImport.onRenderBody

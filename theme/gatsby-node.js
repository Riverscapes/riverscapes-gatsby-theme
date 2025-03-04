/* eslint-disable @typescript-eslint/no-var-requires */
/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
 */

const fs = require('fs')
const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
// const { optimizeImages } = require('./dist/optimize')

const replacePath = (path) => (path === `/` ? path : path.replace(/\/$/, ``))

async function getResults({ graphql, reporter }) {
  const graphqlResult = await graphql(/* GraphQL */ `
    {
      allMdx(sort: { frontmatter: { date: ASC } }, limit: 1000) {
        nodes {
          id
          internal {
            contentFilePath
          }
          fields {
            slug
          }
          parent {
            ... on File {
              sourceInstanceName
            }
          }
        }
      }
    }
  `)

  if (graphqlResult.errors) {
    reporter.panicOnBuild(`There was an error loading your blog posts`, graphqlResult.errors)
    return {}
  }
  return graphqlResult.data
}

/**
 * This function creates all the individual pages in this site
 */
const createIndividualPage = async ({ pages, gatsbyUtilities }) => {
  for (const page of pages) {
    await gatsbyUtilities.actions.createPage({
      // Use the WordPress uri as the Gatsby page path
      // This is a good idea so that internal links and menus work
      path: replacePath(page.fields.slug),

      // use the blog post template as the page component
      component: `${path.resolve(path.join(__dirname, `src/templates/PageTemplate.tsx`))}?__contentFilePath=${
        page.internal.contentFilePath
      }`,

      // `context` is available in the template as a prop and
      // as a variable in GraphQL.
      context: {
        // we need to add the post id here
        // so our blog post template knows which blog post
        // the current page is (when you open it in a browser)
        id: page.id,

        // We also use the next and previous id's to query them and add links!
        // previousPostId: previousPostId,
        // nextPostId: nextPostId,
      },
    })
  }
}

/**
 * @type {import('gatsby').GatsbyNode['createPages']}
 */

exports.createPages = async (gatsbyUtilities) => {
  // Query our posts from the GraphQL server
  const results = await getResults(gatsbyUtilities)

  const pages = (results.allMdx?.nodes || []).filter((val) => val.parent.sourceInstanceName.includes('page'))

  if (pages.length) {
    await createIndividualPage({ pages, gatsbyUtilities })
  }
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  createTypes(`
    type Mdx implements Node {
      frontmatter: MdxFrontmatter!
    }
    type MdxFrontmatter {
      title: String
      menuWeight: Int
      description: String
      blurb: String
      date(formatString: String): String
      isHome: Boolean
      image: File @fileByRelativePath
      imageAlt: String
    }
  `)
}

function MDXSafetyFilter(text) {
  let safeText = text
  // Replace liquid tags with an empty string
  safeText = safeText.replace(/{{[a-z0-9. ]+}}/g, 'ERROR_LIQUID_TAG')
  // Replace unclosed <img> tags with <img />
  safeText = safeText.replace(/<img([^>]+)(?<!\/)>/g, '<ErrorUnclosed tagName="img"><img$1 /></ErrorUnclosed>')
  // Replace unclosed <br> tags with <br />
  safeText = safeText.replace(/<br([^>]*)(?<!\/)>/g, '<ErrorUnclosed tagName="br"><br$1 /></ErrorUnclosed>')
  // Replace unclosed <hr> tags with <hr />
  safeText = safeText.replace(/<hr([^>]*)(?<!\/)>/g, '<ErrorUnclosed tagName="hr"><hr$1 /></ErrorUnclosed>')

  return safeText
}

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `Mdx`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    // Check if the node's content contains any liquid tags
    if (node.rawBody) node.rawBody = MDXSafetyFilter(node.rawBody)
    if (node.body) node.body = MDXSafetyFilter(node.body)
    if (node.excerpt) node.excerpt = MDXSafetyFilter(node.excerpt)
    createNodeField({
      node,
      name: `slug`,
      value: replacePath(slug),
    })
  }
}

/**
 * Execute image optimization during 'build' and 'develop' phases
 */
exports.onPostBootstrap = async ({ graphql, reporter, store }) => {
  // Get the site's content folder
  // reporter.info('Pre-Optimizing images...')
  // const siteDirectory = store.getState().program.directory
  // const contentPath = path.join(siteDirectory, 'content')
  // const staticPath = path.join(siteDirectory, 'static')
  // if (!fs.existsSync(contentPath)) {
  //   reporter.panicOnBuild(`Content folder not found.`, new Error('Content folder not found.'))
  // } else if (!fs.existsSync(staticPath)) {
  //   reporter.panicOnBuild(`Static folder not found.`, new Error('Static folder not found.'))
  // }
  // await Promise.all([
  //   optimizeImages('static/images', reporter)
  //     .then(() => reporter.info('Image optimization complete.'))
  //     .catch((err) => reporter.error('Image optimization failed:', err)),
  //   optimizeImages('content', reporter)
  //     .then(() => reporter.info('Image optimization complete.'))
  //     .catch((err) => reporter.error('Image optimization failed:', err)),
  // ])
}

import { GatsbyConfig } from 'gatsby'

module.exports = {
  // You need pathPrefix if you're hosting GitHub Pages at a Project Pages or if your
  // site will live at a subdirectory like https://example.com/mypathprefix/.
  // pathPrefix: '/mypathprefix',
  flags: {
    // DEV_SSR fixes a problem where `gatsby develop` is overwhelming the system memory
    // It's related to this issue: https://github.com/gatsbyjs/gatsby/issues/36899
    // More about DEV_SSR: https://www.gatsbyjs.com/docs/debugging-html-builds/#ssr-during-gatsby-develop
    // Eventually this needs to go away but likely not until the Gatsby webpack version is updated
    DEV_SSR: false,
  },
  pathPrefix: '/riverscapes-gatsby-theme',
  siteMetadata: {
    title: `Riverscapes Developer Site`,
    author: {
      name: `North Arrow Research`,
    },
    // Just leave this empty ('') if you don't want a help widget in the footer
    helpWidgetId: '153000000178',
    description: ``,
    siteUrl: `https://riverscapes.github.io/riverscapes-gatsby-theme/`,
    social: {
      twitter: `RiverscapesC`,
    },
    menuLinks: [
      {
        title: 'About us',
        url: '/About_Us',
        items: [
          {
            title: 'What is a riverscape',
            url: '/About_Us/whatisariverscape',
          },
          {
            title: 'FAIR principles',
            url: '/About_Us/fair',
          },
        ],
      },
      {
        title: 'Our work',
        url: '/contentPages',
        items: [
          {
            title: 'Riverscapes Consortium Data Exchange',
            url: '/contentPages/contentSubFolder',
          },
          {
            title: 'Riverscapes Consortium Applications',
            url: '/contentPages/contentSubFolder',
          },
          {
            title: 'Riverscapes Consortium Models',
            url: '/contentPages/contentSubFolder',
          },
          {
            title: 'Data Standards and Compliance',
            url: '/contentPages/contentSubFolder',
          },
        ],
      },
      {
        title: 'Impact stories',
        url: '/',
      },
      {
        title: 'Workshops & events',
        url: '/contentPages',
      },
      {
        title: 'Get involved',
        url: '/contentPages',
      },
      {
        title: 'Contact',
        url: '/contentPages',
      },
      {
        title: 'Search',
        url: '/contentPages',
      },
    ],
  },
  plugins: [
    'gatsby-plugin-bundle-stats',
    {
      resolve: '@riverscapes/gatsby-theme',
      options: {
        contentPath: `${__dirname}/content/page`,
        manifest: {
          name: `Riverscapes Developer Site`,
          short_name: `RiverscapesDEV`,
          start_url: `/riverscapes-gatsby-theme`,
          iconUrl: `static/images/favicon.png`,
        },
      },
    },
  ],
} as GatsbyConfig

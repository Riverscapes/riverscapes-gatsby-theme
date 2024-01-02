import { GatsbyConfig } from 'gatsby'

module.exports = {
  // You need pathPrefix if you're hosting GitHub Pages at a Project Pages or if your
  // site will live at a subdirectory like https://example.com/mypathprefix/.
  // pathPrefix: '/mypathprefix',
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
        url: '/contentPages',
        items: [
          {
            title: 'What is a riverscape',
            url: '/contentPages/contentSubFolder',
            items: [
              {
                title: 'Level 2 A',
                url: '/contentPages/contentSubFolder',
              },
              {
                title: 'Level 2 B',
                url: '/contentPages/contentSubFolder',
              },
            ],
          },
          {
            title: 'FAIR principles',
            url: '/contentPages/contentSubFolder',
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
    {
      resolve: '@riverscapes/gatsby-theme',
      options: {
        contentPath: `${__dirname}/content/page`,
        manifest: {
          name: `Riverscapes Developer Site`,
          short_name: `RiverscapesDEV`,
          start_url: `/riverscapes-gatsby-theme`,
        },
      },
    },
  ],
} as GatsbyConfig

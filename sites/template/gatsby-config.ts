import { GatsbyConfig } from 'gatsby'

module.exports = {
  // You need pathPrefix if you're hosting GitHub Pages at a Project Pages or if your
  // site will live at a subdirectory like https://example.com/mypathprefix/.
  // pathPrefix: '/mypathprefix',
  pathPrefix: '/riverscapes-template',
  siteMetadata: {
    title: `Riverscapes Template Site`,
    author: {
      name: `Matt Reimer`,
    },
    // Just leave this empty ('') if you don't want a help widget in the footer
    helpWidgetId: '153000000178',
    description: ``,
    siteUrl: `https://YOURSITEURLHERE`,
    social: {
      twitter: `RiverscapesC`,
    },
    menuLinks: [
      {
        title: 'Menu Item 1',
        url: '/subfolder/innerpage',
        items: [
          {
            title: 'SubMenu 1',
            url: '/subfolder/innerpage',
          },
          {
            title: 'SubMenu 2',
            url: '/subfolder/innerpage',
          },
        ],
      },
      // {
      //   title: 'Menu Item 2',
      //   url: '/our-work/',
      //   items: [
      //     {
      //       title: 'Riverscapes Consortium Data Exchange',
      //       url: '/our-work/data-exchange',
      //     },
      //     {
      //       title: 'Riverscapes Consortium Applications',
      //       url: '/our-work/apps',
      //     },
      //     {
      //       title: 'Riverscapes Consortium Models',
      //       url: '/our-work/models',
      //     },
      //     {
      //       title: 'Data Standards and Compliance',
      //       url: '/our-work/standards',
      //     },
      //   ],
      // },
      // {
      //   title: 'Menu Item 3',
      //   url: '/',
      // },
      // {
      //   title: 'Workshops & events',
      //   url: '/workshops-events',
      // },
      // {
      //   title: 'Get involved',
      //   url: '/get-involved',
      // },
      // {
      //   title: 'Contact',
      //   url: '/',
      // },
      // {
      //   title: 'Search',
      //   url: '/search',
      // },
    ],
  },
  plugins: [
    {
      resolve: '@riverscapes/gatsby-theme',
      options: {
        contentPath: `${__dirname}/content/page`,
        manifest: {
          name: `Riverscapes Gatsby Template Site`,
          short_name: `RiverscapesTemplate`,
          start_url: `/riverscapes-template`,
        },
      },
    },
  ],
} as GatsbyConfig

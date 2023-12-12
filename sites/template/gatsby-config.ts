import { GatsbyConfig } from 'gatsby'

module.exports = {
  // TODO: You need pathPrefix if you're hosting GitHub Pages at a Project Pages or if your
  // site will live at a subdirectory like https://example.com/mypathprefix/.
  pathPrefix: '/riverscapes-template',
  siteMetadata: {
    title: `Riverscapes Template Site`,
    author: {
      name: `North Arrow Research`,
    },
    // TODO: Just leave `helpWidgetId` as an empty string ('') if you don't want the riverscapes help widget in the footer
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
          // TODO: You need to change this to your site's URL. This should match the `pathPrefix` above.
          start_url: `/riverscapes-template`,
        },
      },
    },
  ],
} as GatsbyConfig

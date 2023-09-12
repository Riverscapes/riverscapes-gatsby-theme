import { GatsbyConfig } from 'gatsby'

module.exports = {
  siteMetadata: {
    title: `Riverscapes Developer Site`,
    author: {
      name: `Matt Reimer`,
    },
    pathPrefix: '/riverscapes-gatsby-theme',
    description: ``,
    siteUrl: `https://riverscapes.github.io/riverscapes-gatsby-theme/`,
    social: {
      twitter: `RiverscapesC`,
    },
    menuLinks: [
      {
        title: 'About us',
        url: '/about-us',
        items: [
          {
            title: 'What is a riverscape',
            url: '/about-us/what-is-a-riverscape',
          },
          {
            title: 'FAIR principles',
            url: '/about-us/fair-principles',
          },
        ],
      },
      {
        title: 'Our work',
        url: '/our-work/',
        items: [
          {
            title: 'Riverscapes Consortium Data Exchange',
            url: '/our-work/data-exchange',
          },
          {
            title: 'Riverscapes Consortium Applications',
            url: '/our-work/apps',
          },
          {
            title: 'Riverscapes Consortium Models',
            url: '/our-work/models',
          },
          {
            title: 'Data Standards and Compliance',
            url: '/our-work/standards',
          },
        ],
      },
      {
        title: 'Impact stories',
        url: '/',
      },
      {
        title: 'Workshops & events',
        url: '/workshops-events',
      },
      {
        title: 'Get involved',
        url: '/get-involved',
      },
      {
        title: 'Contact',
        url: '/',
      },
      {
        title: 'Search',
        url: '/search',
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

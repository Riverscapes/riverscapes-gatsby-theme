import { GatsbyConfig } from 'gatsby'

module.exports = {
  siteMetadata: {
    title: `Riverscapes Consortium`,
    author: {
      name: `Michael Kam`,
    },
    description: ``,
    siteUrl: `https://riverscapes.net/`,
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
          name: `Riverscapes Consortium`,
          short_name: `Riverscapes`,
          start_url: `/`,
        },
      },
    },
  ],
} as GatsbyConfig

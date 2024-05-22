import React from 'react'
import { graphql } from 'gatsby'
import { Box, Container, Grid, Typography } from '@mui/material'

// import Bio from "../components/bio"
import Layout from '../components/Layout'
import Seo from '../components/Seo'
import Banner from '../components/Banner'
import ImgCard from '../components/ImgCard'
import MDXRender from '../components/MDXRender'
import SideNav from '../components/menus/SideNav'
import AllPagesMenu from '../components/menus/allPagesMenu'

import defaultImage from '../images/card-image.jpg'
import { ParamsContext } from '../paramsContext'

const PageTemplate = ({ data: { site, mdx: page, bottomMenu: childPages, sideMenu }, children, location }) => {
  // If the page has a query of ?render=noFrame, then just return the content
  const urlParams = new URLSearchParams(location.search)
  const noFrame = urlParams.get('render') === 'noFrame' || false

  const siteTitle = site.siteMetadata?.title || `Title`
  const pageTitle = page.frontmatter.title || null
  const pageDescription = page.frontmatter.description || null
  const pageHeading = page.frontmatter.banner ? (
    <Banner title={page.frontmatter.title} description={page.frontmatter.description} />
  ) : (
    <Container maxWidth={'xl'}>
      {pageTitle && (
        <Typography variant="h1" itemProp="headline" paragraph mt={2}>
          {pageTitle}
        </Typography>
      )}
      {pageDescription && (
        <Typography variant="body2" itemProp="headline" paragraph mt={2}>
          {pageDescription}
        </Typography>
      )}
    </Container>
  )

  const cardsContent = childPages.nodes.map((card, key) => {
    return (
      <Grid key={key} item xs={12} md={6} lg={3}>
        <ImgCard
          img={card.frontmatter.image?.childImageSharp?.gatsbyImageData || defaultImage}
          imgAlt={card.frontmatter.imageAlt}
          to={card.fields.slug}
          heading={card.frontmatter.title}
          headingVariant="h5"
        >
          <Typography variant="body2">{card.frontmatter.blurb}</Typography>
        </ImgCard>
      </Grid>
    )
  })
  const hasSidebar = Boolean(!noFrame)

  return (
    <ParamsContext.Provider value={{ noFrame }}>
      <Layout location={location} title={siteTitle}>
        <Box
          component="article"
          itemScope
          itemType="http://schema.org/Article"
          sx={{
            position: 'relative',
          }}
        >
          {!page.frontmatter.isHome ? (
            <>
              <Box component="header">{pageHeading}</Box>
              <Container maxWidth={'xl'}>
                <Grid container spacing={14}>
                  <Grid item xs={12} md={hasSidebar ? 8 : 12}>
                    <MDXRender>{children}</MDXRender>
                  </Grid>

                  {hasSidebar && (
                    <Grid item xs={12} md={4} component="aside">
                      {page.tableOfContents?.items?.length > 0 && (
                        <SideNav heading="On this page" headingType="h2" content={page.tableOfContents} showHeading />
                      )}
                      <AllPagesMenu heading="All pages" headingType="h2" nodes={sideMenu.nodes} showHeading />
                    </Grid>
                  )}
                </Grid>
              </Container>
              <Container maxWidth="xl" sx={{ mb: 4 }}>
                <Grid container spacing={4} sx={{ my: 3 }}>
                  {cardsContent}
                </Grid>
              </Container>
            </>
          ) : (
            <MDXRender>{children}</MDXRender>
          )}
        </Box>
      </Layout>
    </ParamsContext.Provider>
  )
}

export const Head = ({ data: { mdx: page } }) => {
  return <Seo title={page.frontmatter.title} description={page.frontmatter.description} />
}

export default PageTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($id: String!) {
    site {
      siteMetadata {
        title
      }
    }
    mdx(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      body
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        banner
        isHome
      }
      tableOfContents(maxDepth: 3)
    }
    # TODO: NOTICE THE HARD CODING TO REGEX MATCH THE SLUG
    bottomMenu: allMdx(filter: { fields: { slug: { regex: "/our-work//" } } }) {
      nodes {
        id
        fields {
          slug
        }
        frontmatter {
          description
          title
          blurb
          isHome
          imageAlt
          image {
            childImageSharp {
              gatsbyImageData(width: 800)
            }
          }
        }
      }
    }
    sideMenu: allMdx {
      nodes {
        frontmatter {
          title
        }
        fields {
          slug
        }
      }
    }
  }
`

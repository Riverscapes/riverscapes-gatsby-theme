import React from 'react'
import { graphql } from 'gatsby'
import { Box, Container, Grid, Typography, useTheme } from '@mui/material'

// import Bio from "../components/bio"
import Layout from '../components/Layout'
import Seo from '../components/Seo'
import Banner from '../components/Banner'
import ImgCard from '../components/ImgCard'
import MDXRender from '../components/MDXRender'
import SideNav from '../components/menus/SideNav'

// import PageContent from "../../content/utilities/page.json"

const PageTemplate = ({ data: { site, mdx: page, allMdx: childPages }, children, location }) => {
  const theme = useTheme()
  const siteTitle = site.siteMetadata?.title || `Title`
  const pageHeading = page.frontmatter.banner ? (
    <Banner title={page.frontmatter.title} />
  ) : (
    <h1 itemProp="headline">{page.frontmatter.title}</h1>
  )

  const cardsContent = childPages.nodes.map((card, key) => {
    return (
      <Grid key={key} item xs={12} md={6} lg={3}>
        <ImgCard
          img={card.frontmatter.image?.childImageSharp?.gatsbyImageData}
          imgAlt={card.frontmatter.imageAlt}
          to={card.fields.slug}
          heading={card.frontmatter.title}
          headingVariant="h5"
        >
          <Typography
            variant="body2"
            sx={{
              color: 'white',
            }}
          >
            {card.frontmatter.blurb}
          </Typography>
        </ImgCard>
      </Grid>
    )
  })
  const hasSidebar = page.tabletofContents !== null

  return (
    <Layout location={location} title={siteTitle}>
      <Box component="article" itemScope itemType="http://schema.org/Article">
        {!page.frontmatter.isHome ? (
          <>
            <Box component="header">{pageHeading}</Box>
            <Container maxWidth={'xl'}>
              <Grid container spacing={14}>
                <Grid item xs={12} md={hasSidebar ? 8 : 12}>
                  <MDXRender>{children}</MDXRender>
                </Grid>
                {page.tabletofContents !== null && (
                  <Grid item xs={12} md={4} component="aside">
                    <SideNav heading="On this page" headingType="h2" content={page.tableOfContents} showHeading />
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
    allMdx(filter: { fields: { slug: { regex: "/our-work//" } } }) {
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
  }
`

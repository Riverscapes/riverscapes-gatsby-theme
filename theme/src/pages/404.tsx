import React, { useState } from 'react'
import { graphql, Link } from 'gatsby'
import { Box, Container, Grid, Typography, TextField, Stack, IconButton } from '@mui/material'

import Layout from '../components/Layout'
import Seo from '../components/Seo'
import Banner from '../components/Banner'
import { ArrowDownward, ArrowUpward, SortByAlpha } from '@mui/icons-material'

interface NotFoundPageProps {
  data: {
    site: {
      siteMetadata: {
        title: string
      }
    }
    allSitePage: {
      nodes: {
        path: string
      }[]
    }
  }
  location: Location
}

const NotFoundPage: React.FC<NotFoundPageProps> = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const [search, setSearch] = useState('')
  const [sortAsc, setSortAsc] = useState(true)

  let pages = data.allSitePage.nodes
  // filter out anything with '404' in it
  pages = pages.filter((page) => !page.path.includes('404'))

  if (search) {
    pages = pages.filter((page) => page.path.includes(search))
  }

  if (sortAsc) {
    pages.sort((a, b) => a.path.localeCompare(b.path))
  } else {
    pages.sort((a, b) => b.path.localeCompare(a.path))
  }

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="404: Not Found" />
      <Box component="article" itemScope itemType="http://schema.org/Article">
        <Box component="header">
          <Banner title="404: Not Found" />
        </Box>

        <Container maxWidth={'xl'}>
          <Grid container spacing={14} pb={10}>
            <Grid item xs={12} md={12}>
              <Box sx={{ py: 4 }}>
                <Typography paragraph>
                  You just hit a route that doesn&#39;t exist. But here are some available pages:
                </Typography>
                <Stack direction="row" spacing={2}>
                  <TextField label="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
                  <IconButton onClick={() => setSortAsc(!sortAsc)}>
                    {sortAsc ? <ArrowUpward /> : <ArrowDownward />}
                    <SortByAlpha />
                  </IconButton>
                </Stack>
                <ul>
                  {pages.map((page) => (
                    <li key={page.path}>
                      <Link to={page.path}>{page.path}</Link>
                    </li>
                  ))}
                </ul>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Layout>
  )
}

export default NotFoundPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allSitePage {
      nodes {
        path
      }
    }
  }
`

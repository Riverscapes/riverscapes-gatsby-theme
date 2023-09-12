/**
 * Footer component
 */

import React from 'react'
import { Link as GatsbyLink, useStaticQuery, graphql } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import Menu from './menus/Menu'

/* Content */
import footerContent from '../content/utilities/footer.json'

/* Footer style */
import { Copyright } from './Copyright'
import { Box, Container, Divider, IconButton, Stack, SxProps, Theme, Typography, useTheme } from '@mui/material'

const stylesThunk = (theme: Theme): Record<string, SxProps<Theme>> => ({
  wrapper: {
    color: 'white',
    position: 'relative',
    overflow: 'hidden',
  },
  container: {
    position: 'relative',
    flexDirection: {
      xs: 'column',
      md: 'row',
    },
    flexWrap: {
      xs: 'nowrap',
      md: 'wrap',
    },
    '@media (min-width: 680px) and (max-width: 979px)': {
      flexDirection: 'row',
      flexWrap: 'wrap',
      '& > *': {
        flex: 1,
      },
      '& :nth-of-type(1)': {
        flex: '0 0 100%',
      },
    },
    '@media (min-width: 980px)': {
      flexDirection: 'row',
    },
  },
})

const Footer: React.FC = () => {
  const theme = useTheme()
  const styles = stylesThunk(theme)

  const data = useStaticQuery(graphql`
    query Query {
      site {
        siteMetadata {
          social {
            twitter
          }
        }
      }
    }
  `)

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const social = data.site.siteMetadata?.social

  return (
    <Box component="footer" sx={styles.wrapper}>
      <StaticImage
        style={{
          backgroundColor: 'black', // fallback so we can still see something while loading
          position: 'absolute',
          width: '100%',
          height: '100%',
          zIndex: -1,
        }}
        layout="fullWidth"
        formats={['auto', 'webp', 'avif']}
        src="../images/background-footer.jpg"
        quality={95}
        alt="Wave Pattern"
      />
      <Container maxWidth={'xl'} sx={styles.container}>
        <Stack
          direction="row"
          spacing={4}
          gap={4}
          sx={{ width: '100%', my: 8 }}
          justifyContent={'space-between'}
          alignItems={'flex-start'}
        >
          <Box>
            <GatsbyLink to="/">
              <StaticImage
                layout="constrained"
                formats={['auto', 'webp', 'avif']}
                src="../images/logo.png"
                width={228}
                quality={100}
                alt="Riverscapes Consortium logo"
                placeholder="none"
              />
            </GatsbyLink>
          </Box>
          <Box>
            <Typography variant="h3" paragraph sx={{ color: 'inherit' }}>
              {footerContent.contact.heading}
            </Typography>
            <Typography variant="body1" dangerouslySetInnerHTML={{ __html: footerContent.contact.content }} />
          </Box>
          <Box>
            <Typography variant="h3" paragraph sx={{ color: 'inherit' }}>
              {footerContent.link.heading}
            </Typography>
            <Menu invert />
          </Box>
          <Box>
            <Typography variant="h3" paragraph sx={{ color: 'inherit' }}>
              {footerContent.follow.heading}
            </Typography>
            <IconButton onClick={() => window.open(`https://twitter.com/${social?.twitter}` || '', '_blank')}>
              <StaticImage
                layout={'constrained'}
                formats={['auto', 'webp', 'avif']}
                src="../images/icon-twitter.png"
                width={36}
                quality={100}
                alt="Twitter logo"
                placeholder="none"
              />
            </IconButton>
          </Box>
        </Stack>
      </Container>
      <Divider />
      <Copyright />
    </Box>
  )
}

export default Footer

/**
 * Footer component
 */

import React, { useEffect, useRef } from 'react'
import { Link as GatsbyLink, useStaticQuery, graphql } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import Menu from './menus/Menu'

/* Content */
import footerContent from '../content/utilities/footer.json'

/* Footer style */
import { Copyright } from './Copyright'
import { Box, Container, Divider, IconButton, Stack, SxProps, Theme, Typography, useTheme } from '@mui/material'
import MenuButton from './menus/MenuButton'

const stylesThunk = (theme: Theme): Record<string, SxProps<Theme>> => ({
  wrapper: {
    color: 'white',
    position: 'relative',
    overflow: 'hidden',
  },
  container: {
    position: 'relative',
  },
})

const Footer: React.FC = () => {
  const theme = useTheme()
  const styles = stylesThunk(theme)

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
        formats={['auto', 'webp']}
        src="../images/background-footer.jpg"
        quality={95}
        alt="Wave Pattern"
      />
      <Container maxWidth={'xl'} sx={styles.container}>
        <Stack
          direction={{ md: 'column', lg: 'row' }}
          spacing={4}
          gap={4}
          sx={{ width: '100%', my: 8 }}
          justifyContent={'space-between'}
          alignItems={'flex-start'}
        >
          <Box>
            <GatsbyLink to="https://riverscapes.net" target="_blank">
              <StaticImage
                layout="constrained"
                formats={['auto', 'webp']}
                src="../images/logo.png"
                width={228}
                quality={100}
                alt="Riverscapes Consortium logo"
                placeholder="none"
              />
            </GatsbyLink>
          </Box>
          <Box>
            <Typography variant="h4" paragraph sx={{ color: 'inherit' }}>
              {footerContent.contact.heading}
            </Typography>
            <Stack
              direction={'column'}
              gap={{
                xs: 0,
                lg: 2,
              }}
              sx={{
                '& *': {
                  color: 'white',
                },
                width: '100%;',
              }}
            >
              {footerContent.contact.content.map((item, index) => (
                <MenuButton
                  key={`menu-item-${index}`}
                  target="_blank"
                  sx={{
                    color: 'white',
                    justifyContent: 'flex-start',
                    p: 0,
                    '&:hover': {
                      textDecoration: 'underline',
                    },
                  }}
                  to={item.link}
                >
                  {item.label}
                </MenuButton>
              ))}
            </Stack>
          </Box>
          <Box>
            <Typography variant="h4" paragraph sx={{ color: 'inherit' }}>
              {footerContent.link.heading}
            </Typography>
            <Menu invert />
          </Box>
        </Stack>
      </Container>
      <Divider />
      <Copyright />
    </Box>
  )
}

export default Footer

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

// In order to use the Freshworks widget, we need to declare the global
declare global {
  interface Window {
    fwSettings: {
      widget_id: number
      // Add other properties if needed
    }
    FreshworksWidget: (...args: any[]) => void
  }
}

const Footer: React.FC = () => {
  const theme = useTheme()
  const boxRef = useRef<HTMLDivElement>(null) // Create a ref for the <Box> element
  const styles = stylesThunk(theme)

  const data = useStaticQuery(graphql`
    query Query {
      site {
        siteMetadata {
          helpWidgetId
          social {
            twitter
          }
        }
      }
    }
  `)

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const social = data.site.siteMetadata?.social
  const hasHelpWidget = data.site.siteMetadata?.helpWidgetId !== undefined
  const helpWidgetId = data.site.siteMetadata?.helpWidgetId

  useEffect(() => {
    if (!helpWidgetId) return
    // Configure Freshworks widget settings
    window.fwSettings = {
      widget_id: 153000000178,
    }

    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = `https://widget.freshworks.com/widgets/${helpWidgetId}.js`
    script.async = true
    script.defer = true

    // Append the script to the DOM element inside the <Box>
    if (boxRef.current) {
      boxRef.current.appendChild(script)
    }
  }, [helpWidgetId]) // Empty dependency array means this effect runs once after the initial render

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
            {hasHelpWidget && <Box ref={boxRef}>{/* Your other content */}</Box>}
          </Box>
          <Box>
            <Typography variant="h4" paragraph sx={{ color: 'inherit' }}>
              {footerContent.link.heading}
            </Typography>
            <Menu invert />
          </Box>
          <Box>
            <Typography variant="h4" paragraph sx={{ color: 'inherit' }}>
              {footerContent.follow.heading}
            </Typography>
            <IconButton onClick={() => window.open(`https://twitter.com/${social?.twitter}` || '', '_blank')}>
              <StaticImage
                layout={'constrained'}
                formats={['auto', 'webp']}
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

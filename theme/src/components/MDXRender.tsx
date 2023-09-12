import React from 'react'
import { MDXProvider } from '@mdx-js/react'
import { Box, Divider, Stack, Grid, Typography, useTheme, Alert } from '@mui/material'
import 'prismjs/themes/prism-dark.css'
// import Bio from "../components/bio"
import Button from './RSLinkButton'
import { RSLink } from './RSLink'
import { StoryCard } from './StoryCard'
import Hero from '../components/Hero'
import { YoutubeEmbed } from '../components/YoutubeEmbed'
import HomepageCard, { HomepageCardContent, HomepageCardHighlight, HomepageCardStat } from '../components/homepageCards'

// import PageContent from "../../content/utilities/page.json"

const MDXRender: React.FC<React.PropsWithChildren> = ({ children }) => {
  const theme = useTheme()

  const shortcodes: Record<string, any> = {
    HomepageCard,
    HomepageCardContent,
    HomepageCardHighlight,
    HomepageCardStat,
    Button,
    Hero,
    Link: RSLink,
    Youtube: YoutubeEmbed,
    Box,
    StoryCard,
    Stack,
    Grid,
    Alert,
  }

  const hStyles = {
    mt: 8,
    mb: 6,
    '&:hover': {
      '& .header-link-icon': {
        display: 'block',
      },
    },
  }

  return (
    <MDXProvider
      components={{
        ...shortcodes,
        h1: ({ children }) => (
          <Typography variant="h1" sx={hStyles}>
            {children}
          </Typography>
        ),
        h2: ({ children }) => (
          <Typography variant="h2" sx={hStyles}>
            {children}
          </Typography>
        ),
        h3: ({ children }) => (
          <Typography variant="h3" sx={hStyles}>
            {children}
          </Typography>
        ),
        h4: ({ children }) => (
          <Typography variant="h4" sx={hStyles}>
            {children}
          </Typography>
        ),
        h5: ({ children }) => (
          <Typography variant="h5" sx={hStyles}>
            {children}
          </Typography>
        ),
        h6: ({ children }) => (
          <Typography variant="h6" sx={hStyles}>
            {children}
          </Typography>
        ),
        img: ({ src, alt, ...rest }) => {
          return (
            <Box
              sx={{
                maxWidth: '100%',
                height: 'auto',
                alignItems: 'center',
                textAlign: 'center',
              }}
            >
              <img
                src={src}
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                }}
                alt={alt}
                {...rest}
              />
            </Box>
          )
        },
        a: (props) => {
          const { className, href } = props

          // For internal targets the MDX plugin renders a little SVG button. we need to leave that alone
          if (className && className.indexOf('header-link-icon') >= 0) return <a {...props} />

          return <RSLink to={href} {...(props as any)} />
        },
        p: ({ children }) => (
          <Typography
            paragraph
            sx={{
              mt: 4,
            }}
          >
            {children}
          </Typography>
        ),
        hr: () => (
          <Divider
            sx={{
              border: '2px solid #B4CE00',
              backgroundColor: '#B4CE00',
              color: '#B4CE00',
            }}
          />
        ),
        li: ({ children }) => (
          <Typography
            component="li"
            sx={{
              mt: 1,
            }}
          >
            {children}
          </Typography>
        ),
        // iframe: (props) => {
        //   // iframes that get pasted in have allkinds of problems
        //   const { allowfullscreen, frameborder, ...rest } = props
        // },
        blockquote: ({ children }) => (
          <Typography
            component={'blockquote'}
            sx={{
              color: theme.palette.info.main,
              fontFamily: '"JetBrains Mono", "Courier New", sans-serif',
              maxWidth: theme.breakpoints.values.xl,
              mt: 4,
              '& p': {
                // px: 2,
                fontSize: '1.95rem',
                //   margin: [0, 'auto'],
              },
            }}
          >
            {children}
          </Typography>
        ),
      }}
    >
      {children}
    </MDXProvider>
  )
}

export default MDXRender

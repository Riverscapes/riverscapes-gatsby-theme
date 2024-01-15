import React from 'react'
import { MDXProvider } from '@mdx-js/react'
import {
  Box,
  Divider,
  Stack,
  Grid,
  Typography,
  useTheme,
  Alert,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  TableFooter,
} from '@mui/material'

import RSLinkButton from './custom/RSLinkButton'
import { ContentLink } from './ContentLink'
import ImgCard from './ImgCard'
import { StoryCard } from './StoryCard'
import Hero from './custom/Hero'
import { YoutubeEmbed } from './custom/YoutubeEmbed'
import HomepageCard, { HomepageCardContent, HomepageCardHighlight, HomepageCardStat } from '../components/homepageCards'
import MDXErrorBoundary from './MDXErrorBoundary'
import { ErrorLiquidText, ErrorUnclosed } from './MDXErrors'
import { RSStaticImage } from './custom/RSStaticImage'
import { RSIcon } from './custom/RSIcon'

const MDXRender: React.FC<React.PropsWithChildren> = ({ children }) => {
  const theme = useTheme()

  const shortcodes: Record<string, any> = {
    // Here are the homepage-specifc cards
    HomepageCard,
    HomepageCardContent,
    HomepageCardHighlight,
    HomepageCardStat,
    ImgCard,
    // And here are the custom components we wrote to make content
    // writing easier
    Hero,
    Button: RSLinkButton,
    Icon: RSIcon,
    Image: RSStaticImage,
    Link: ContentLink,
    Youtube: YoutubeEmbed,
    // These aren't supposed to be used directly but we need them to catch
    // conversion errors from old MDX components
    ErrorLiquidText,
    ErrorUnclosed,
    // And we expose some MUI native elements as well
    Box,
    StoryCard,
    Stack,
    Grid,
    Alert,
  }

  const hStyles = {
    mt: 8,
    mb: 6,
    clear: 'both',
    '&:hover': {
      '& .header-link-icon': {
        display: 'block',
      },
    },
    // Dial back the font sizes a bit for the content
    // area. Reference `/theme/src/muiTheme.tsx`
    '&.MuiTypography-h1': { fontSize: '2.5rem' },
    '&.MuiTypography-h2': { fontSize: '1.8rem' },
    '&.MuiTypography-h3': { fontSize: '1.4rem' },
    '&.MuiTypography-h4': { fontSize: '1rem' },
    '&.MuiTypography-h5': { fontSize: '1.25rem' },
    '&.MuiTypography-h6': { fontSize: '1rem' },
  }

  return (
    <MDXErrorBoundary>
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
          // Add a custom component for the 'comment' tag so we ignore comments
          comment: ({ children }) => <React.Fragment>{/* Ignore comments */}</React.Fragment>,
          img: ({ src, alt, ...rest }) => {
            return (
              <Box
                sx={{
                  width: '100%',
                  display: 'flex', // Make this a flex container
                  alignItems: 'center', // Center children vertically
                  justifyContent: 'center', // Center children horizontally
                }}
              >
                <RSStaticImage src={src} alt={alt} />
              </Box>
            )
          },
          a: (props) => {
            const { className, href } = props

            // For internal targets the MDX plugin renders a little SVG button. we need to leave that alone
            if (className && className.indexOf('header-link-icon') >= 0) {
              return <a id={props.href} {...props} />
            }

            return <ContentLink to={href} {...(props as any)} />
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
                clear: 'both',
                border: '2px solid #B4CE00',
                backgroundColor: '#B4CE00',
                color: '#B4CE00',
              }}
            />
          ),
          ul: ({ children }) => (
            <ul
              style={{
                clear: 'both',
              }}
            >
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol
              style={{
                clear: 'both',
              }}
            >
              {children}
            </ol>
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
          blockquote: ({ children }) => (
            <Typography
              component={'blockquote'}
              sx={{
                maxWidth: theme.breakpoints.values.xl,
                mt: 4,
                '&,& p': {
                  color: theme.palette.info.main,
                  fontFamily: '"JetBrains Mono", "Courier New", sans-serif',
                  // px: 2,
                  fontSize: '1.95rem',
                  //   margin: [0, 'auto'],
                },
              }}
            >
              {children}
            </Typography>
          ),
          table: ({ children }) => (
            <TableContainer
              sx={{
                clear: 'both',
              }}
            >
              <Table>{children}</Table>
            </TableContainer>
          ),
          thead: ({ children }) => <TableHead>{children}</TableHead>,
          tbody: ({ children }) => <TableBody>{children}</TableBody>,
          tfoot: ({ children }) => <TableFooter>{children}</TableFooter>,
          tr: ({ children }) => (
            <TableRow
              style={{
                clear: 'both',
              }}
            >
              {children}
            </TableRow>
          ),
          td: ({ children }) => <TableCell>{children}</TableCell>,
          th: ({ children }) => <TableCell sx={{ fontWeight: 'bold' }}>{children}</TableCell>,
          '*': ({ children }) => (
            <Typography
              component="span"
              sx={{
                mt: 1,
              }}
            >
              {children}
            </Typography>
          ),
        }}
      >
        <Box
          // Any last-minute style injection can happen here
          sx={{
            // Inline code blocks need some tweaking from what prismjs gives us
            '& :not(pre) > code[class*="language-"]': {
              // color: '#555577',
              // fontSize: '0.9em',
              // fontFamily: '"JetBrains Mono", "Courier New", sans-serif',
              // backgroundColor: '#44444444',
              // border: '1px solid #2a2a2a',
              // px: 1,
              // mx: 0.5,
              // py: 0.2,
              // borderRadius: 1,
              // textShadow: 'none',
              // boxShadow: 'none',
            },
          }}
        >
          {children}
        </Box>
      </MDXProvider>
    </MDXErrorBoundary>
  )
}

export default MDXRender

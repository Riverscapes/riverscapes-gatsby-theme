/**
 * Card component
 */

import React from 'react'
import { withPrefix } from 'gatsby'
import { RSLink } from './RSLink'
import { Stack, Typography, useMediaQuery, useTheme } from '@mui/material'

type RSStaticImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  src: string
  to?: string
  noWrap?: boolean
  caption?: string
  float?: 'left' | 'right'
}

export const RSStaticImage: React.FC<RSStaticImageProps> = ({ src, to, noWrap, style, caption, float, ...rest }) => {
  // If the image is a relative path, append the pathPrefix from gatsby-config.js
  let newSrc: string = src
  if (newSrc.startsWith('/')) {
    newSrc = withPrefix(newSrc)
  }

  return (
    <RStaticFullWidthWrapper noWrap={!noWrap} caption={caption} float={float}>
      <RSStaticImageLink to={to}>
        <img
          src={newSrc}
          style={{
            height: 'auto',
            margin: '0 auto', // Used to center the image
            maxWidth: '100%',
            objectFit: !noWrap ? 'fill' : undefined,
            ...style,
          }}
          {...rest}
        />
      </RSStaticImageLink>
    </RStaticFullWidthWrapper>
  )
}

// A wrapper for the image that makes it a link if the link exists. Otherwise it's just an image
type RSStaticImageLinkProps = {
  to: string
  children: React.ReactNode
}

export const RSStaticImageLink: React.FC<RSStaticImageLinkProps> = ({ to, children }) => {
  if (!to) return <>{children}</>
  return (
    <RSLink to={to} sx={{ textAlign: 'center' }}>
      {children}
    </RSLink>
  )
}

type RStaticFullWidthWrapperProps = {
  noWrap?: boolean
  caption?: string
  float?: 'left' | 'right'
  children: React.ReactNode
}
export const RStaticFullWidthWrapper: React.FC<RStaticFullWidthWrapperProps> = ({
  noWrap,
  caption,
  children,
  float,
}) => {
  const theme = useTheme()
  const isSmall = useMediaQuery(theme.breakpoints.down('md'))
  if (!noWrap) return <>{children}</>
  console.log('marzipan', isSmall)
  const sx =
    !isSmall && float
      ? {
          float,
          clear: float === 'left' ? 'left' : 'right',
          mr: float === 'left' ? 2 : undefined,
          ml: float === 'right' ? 2 : undefined,
        }
      : {
          display: 'flex',
          justifyContent: 'center',
          width: !float ? '100%' : undefined,
        }
  return (
    <Stack sx={sx}>
      {children}
      {caption && (
        <Typography variant="caption" style={{ textAlign: 'center', width: '100%' }}>
          {caption}
        </Typography>
      )}
    </Stack>
  )
}

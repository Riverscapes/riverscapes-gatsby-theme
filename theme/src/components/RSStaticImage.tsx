/**
 * Card component
 */

import React from 'react'
import { withPrefix } from 'gatsby'
import { RSLink } from './RSLink'
import { Box } from '@mui/material'

type RSStaticImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  src: string
  to?: string
  noWrap?: boolean
}

export const RSStaticImage: React.FC<RSStaticImageProps> = ({ src, to, noWrap, style, ...rest }) => {
  // If the image is a relative path, append the pathPrefix from gatsby-config.js
  let newSrc: string = src
  if (newSrc.startsWith('/')) {
    newSrc = withPrefix(newSrc)
  }

  return (
    <RStaticFullWidthWrapper noWrap={!noWrap}>
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
  return <RSLink to={to}>{children}</RSLink>
}

type RStaticFullWidthWrapperProps = {
  noWrap?: boolean
  children: React.ReactNode
}
export const RStaticFullWidthWrapper: React.FC<RStaticFullWidthWrapperProps> = ({ noWrap, children }) => {
  if (!noWrap) return <>{children}</>
  return (
    <Box
      style={{
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
      }}
    >
      {children}
    </Box>
  )
}

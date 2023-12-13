/**
 * Card component
 */

import React from 'react'
import { withPrefix } from 'gatsby'

type RSStaticImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  src: string
}

export const RSStaticImage: React.FC<RSStaticImageProps> = ({ src, ...rest }) => {
  // If the image is a relative path, append the pathPrefix from gatsby-config.js
  let newSrc: string = src
  if (newSrc.startsWith('/')) {
    newSrc = withPrefix(newSrc)
  }

  return (
    <img
      src={newSrc}
      style={{
        height: 'auto',
        margin: '0 auto', // Used to center the image
        maxWidth: '100%',
        maxHeight: '100%',
        objectFit: 'contain',
      }}
      {...rest}
    />
  )
}

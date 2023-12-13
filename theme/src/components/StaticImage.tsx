/**
 * Card component
 */

import React from 'react'

type RSStaticImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  src: string
}

export const RSStaticImage: React.FC<RSStaticImageProps> = ({ src, ...rest }) => {
  // If the image is a relative path, append the pathPrefix from gatsby-config.js
  let newSrc: string = src
  if (newSrc.startsWith('/')) {
    newSrc = `${process.env.PATH_PREFIX || ''}${newSrc}`
  }

  return (
    <img
      src={newSrc}
      style={{
        height: 'auto',
        margin: '0 auto', // Used to center the image
        // Now fill the box and preserve the aspect ratio and make sure it never
        // scales bigger than the original image.
        maxWidth: '100%',
        maxHeight: '100%',
        objectFit: 'contain',
      }}
      {...rest}
    />
  )
}

/**
 * Card component
 */

import React from 'react'
import { default as Link } from '../ContentLink'
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image'
import { Box, Card, CardActionArea, CardContent, Typography, useTheme } from '@mui/material'

interface ImgCardProps {
  to: string
  img: IGatsbyImageData
  imgAlt: string
  heading: string
  headingVariant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5'
  children: React.ReactNode
}

const ImgCard: React.FC<ImgCardProps> = ({ to, img, imgAlt, heading, headingVariant, children }) => {
  const theme = useTheme()
  const imgIsString = typeof img === 'string'
  return (
    <Card>
      <CardActionArea component={Link} to={to}>
        {imgIsString ? (
          <Box>
            <img src={img} alt={imgAlt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </Box>
        ) : (
          <GatsbyImage image={img} alt={imgAlt} />
        )}
        <CardContent>
          <Typography gutterBottom variant={headingVariant} component="div">
            {heading}
          </Typography>
          <Box>{children}</Box>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default ImgCard

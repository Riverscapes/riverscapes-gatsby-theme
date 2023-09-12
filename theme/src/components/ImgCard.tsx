/**
 * Card component
 */

import React from 'react'
import { Link } from 'gatsby'
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image'
import { Box, Card, CardActionArea, CardContent, Typography } from '@mui/material'

interface ImgCardProps {
  to: string
  img: IGatsbyImageData
  imgAlt: string
  heading: string
  headingVariant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5'
  children: React.ReactNode
}

const ImgCard: React.FC<ImgCardProps> = ({ to, img, imgAlt, heading, headingVariant, children }) => {
  return (
    <Card>
      <CardActionArea component={Link} to={to}>
        <GatsbyImage image={img} alt={imgAlt} />
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

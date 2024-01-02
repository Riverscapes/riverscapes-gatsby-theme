import { Box, Card, CardActionArea, CardContent, Grid, Typography } from '@mui/material'
import React from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'
import { ContentLink as Link } from './ContentLink'

interface StoryCardProps {
  title: string
  to: string
  description: string
  image: string
  imageAlt?: string
}

export const StoryCard: React.FC<StoryCardProps> = ({ title, to, description, image, imageAlt }) => {
  const imgIsString = typeof image === 'string'
  return (
    <Grid item xs={12} md={6} lg={3}>
      <Card sx={{ height: '100%' }}>
        <CardActionArea component={Link} to={to}>
          {imgIsString ? (
            <Box>
              <img src={image} alt={imageAlt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </Box>
          ) : (
            <GatsbyImage image={image} alt={imageAlt} />
          )}{' '}
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
            <Typography variant="caption" component="div" color="text.secondary">
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  )
}

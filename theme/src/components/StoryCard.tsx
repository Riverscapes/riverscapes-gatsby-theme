import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography, useTheme } from '@mui/material'
import React from 'react'
import { Link as GatsbyLink } from 'gatsby'
import defaultCardImage from '../images/card-image.jpg'

interface StoryCardProps {
  title: string
  to: string
  description: string
  image: string
  imageAlt?: string
}

export const StoryCard: React.FC<StoryCardProps> = ({ title, to, description, image, imageAlt }) => {
  const theme = useTheme()
  const CustomLinkStub = (props, ref) => <GatsbyLink to={to} {...props} ref={ref} />
  const Component = React.forwardRef(CustomLinkStub)

  return (
    <Grid item xs={12} md={6} lg={3}>
      <Card>
        <CardActionArea LinkComponent={Component}>
          <CardMedia component="img" image={image || defaultCardImage} alt={imageAlt} />
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

import React from 'react'
import { Box, Container, Typography } from '@mui/material'
import background from '../images/background-banner.jpg'

interface BannerProps {
  title: string
}

const Banner: React.FC<BannerProps> = ({ title }) => {
  return (
    <Box
      sx={{
        background: `url(${background})`,
        backgroundSize: 'cover',
        width: '100%',
        minHeight: '18vw', // 350/1920
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: {
          xl: '18vw', // 350/1920
        },
      }}
    >
      <Container
        sx={{
          paddingLeft: 2,
          paddingRight: 2,
          margin: '0 auto',
          width: '100%',
        }}
      >
        <Typography
          variant="h1"
          sx={{
            color: 'white',
          }}
        >
          {title}
        </Typography>
      </Container>
    </Box>
  )
}

export default Banner

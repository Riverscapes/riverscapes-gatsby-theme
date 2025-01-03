import React from 'react'
import { Box, Container, Typography } from '@mui/material'
import background from '../images/background-banner.jpg'

interface BannerProps {
  title: string
  description?: string
}

const Banner: React.FC<BannerProps> = ({ title, description }) => {
  return (
    <Box
      sx={{
        background: `url(${background})`,
        backgroundSize: 'cover',
        width: '100%',
        minHeight: '15vw', // 350/1920
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: {
          xl: '15vw', // 350/1920
        },
      }}
    >
      <Container
        maxWidth="xl"
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
            fontSize: '2.2rem',
          }}
        >
          {title}
        </Typography>
        {description && (
          <Typography
            variant="body2"
            mt={3}
            sx={{
              color: 'white',
            }}
          >
            {description}
          </Typography>
        )}
      </Container>
    </Box>
  )
}

export default Banner

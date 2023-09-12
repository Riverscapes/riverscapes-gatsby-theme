/**
 * Footer component
 */

import React from 'react'
import { StaticImage } from 'gatsby-plugin-image'
import { Container, Stack, Typography } from '@mui/material'

export const Copyright: React.FC = () => {
  return (
    <Container maxWidth={'xl'}>
      <Stack
        direction="row"
        justifyContent={'flex-end'}
        alignItems={'center'}
        gap={3}
        onClick={() => window.open(`https://creativecommons.org/licenses/by/4.0/`, '_blank')}
        sx={{
          cursor: 'pointer',
          color: 'white',
          p: [2, 'auto'],
        }}
      >
        <StaticImage
          layout={'constrained'}
          formats={['auto', 'webp', 'avif']}
          src="../images/icon-copyright.png"
          width={36}
          quality={100}
          alt="copyright logo"
          placeholder="none"
        />
        <StaticImage
          layout={'constrained'}
          formats={['auto', 'webp', 'avif']}
          src="../images/icon-person.png"
          width={36}
          quality={100}
          alt="Person logo"
          placeholder="none"
        />
        <Typography variant="body1" sx={{ '&, & *': { color: 'white' } }}>
          Riverscapes Consortium
        </Typography>
      </Stack>
    </Container>
  )
}

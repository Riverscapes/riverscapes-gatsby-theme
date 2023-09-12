import React from 'react'
import { Box } from '@mui/material'

interface YoutubeEmbedProps {
  embedId: string
}

export const YoutubeEmbed: React.FC<YoutubeEmbedProps> = ({ embedId }) => {
  return (
    <Box
      sx={{
        overflow: 'hidden',
        pb: '56.25%',
        position: 'relative',
        height: 0,
        '&>iframe': {
          left: 0,
          top: 0,
          height: '100%',
          width: '100%',
          position: 'absolute',
        },
      }}
    >
      <iframe
        width="853"
        height="480"
        src={`https://www.youtube.com/embed/${embedId}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
      />
    </Box>
  )
}

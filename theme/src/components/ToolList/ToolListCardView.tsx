import { Box, Card, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2/Grid2'
import React from 'react'
import { Tool } from './types'

import { StaticImage } from 'gatsby-plugin-image'

export interface ToolListCardViewProps {
  tools: Tool[]
}

export const ToolListCardView: React.FC<ToolListCardViewProps> = ({ tools }) => {
  return (
    <Grid container spacing={2}>
      {tools.map((tool) => (
        <Grid key={tool.id} xs={12} sm={6} md={4}>
          <ToolListCard tool={tool} />
        </Grid>
      ))}
    </Grid>
  )
}

export interface ToolListCardProps {
  tool: Tool
}

export const ToolListCard: React.FC<ToolListCardProps> = ({ tool }) => {
  console.log(__dirname)

  return (
    <Card>
      <Box sx={{ width: '100%', height: '70px' }}>
        <StaticImage
          src="/static/images/tools/default.jpg"
          alt="card image"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </Box>

      <Box sx={{ p: 2 }}>
        <Typography sx={{ fontWeight: 'bold' }}>{tool.name}</Typography>
        <Box>{tool.description}</Box>
      </Box>
    </Card>
  )
}

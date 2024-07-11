import { Box, Paper } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2/Grid2'
import React from 'react'
import { Tool } from './types'

export interface ToolListCardViewProps {
  tools: Tool[]
}

export const ToolListCardView: React.FC<ToolListCardViewProps> = ({ tools }) => {
  return (
    <Grid container spacing={2}>
      {tools.map((tool) => (
        <Grid key={tool.id} xs={12} sm={6} md={4} lg={3}>
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
  return (
    <Paper elevation={3}>
      <Box>{tool.name}</Box>
      <Box>{tool.description}</Box>
    </Paper>
  )
}

import { Box, Typography } from '@mui/material'
import React from 'react'
import { Tool } from './types'

export type ToolListFilters = {
  purpose: string[]
  compliance: string[]
  interface: string[]
  resolution: string[]
}

export interface ToolListFilterProps {
  tools: Tool[]
  setFilters: (filters: any) => void
  filters: ToolListFilters
}

export const ToolListFilters: React.FC<ToolListFilterProps> = ({ tools, setFilters, filters }) => {
  return (
    <Box flex={0} width={200}>
      <Typography>Filters</Typography>
    </Box>
  )
}

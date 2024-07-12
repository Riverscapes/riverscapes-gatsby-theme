import { Box, Typography } from '@mui/material'
import React from 'react'
import { Tool, ToolListFilterValues } from './types'

export interface ToolListFilterProps {
  tools: Tool[]
  setFilters: (filters: any) => void
  filters: ToolListFilterValues
}

export const ToolListFilters: React.FC<ToolListFilterProps> = ({ tools, setFilters, filters }) => {
  return (
    <Box flex={0} width={200}>
      <Typography>Filters</Typography>
    </Box>
  )
}

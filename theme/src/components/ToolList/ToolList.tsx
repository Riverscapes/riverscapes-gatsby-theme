import { Box, Button, ButtonGroup, Stack } from '@mui/material'
import React, { useMemo } from 'react'
import { ToolListFilters } from './ToolListFilters'
import { Tool } from './types'
import { ToolListCardView } from './ToolListCardView'
import { ToolListTableView } from './ToolListTableView'

export interface ToolListProps {
  initialFilters: ToolListFilters
  tools: Tool[]
}

const ViewEnum = {
  Card: 'Card',
  Table: 'Table',
}

export const ToolList: React.FC<ToolListProps> = ({ initialFilters, tools }) => {
  const [filters, setFilters] = React.useState(initialFilters)
  const [view, setView] = React.useState(ViewEnum.Card)

  const viewEl = useMemo(() => {
    // IMPLEMENT FILTERING HERE
    const filteredTools = [...tools]
    switch (view) {
      case ViewEnum.Card:
        return <ToolListCardView tools={filteredTools} />
      case ViewEnum.Table:
        return <ToolListTableView tools={filteredTools} />
    }
  }, [view, tools, filters])

  return (
    <Box sx={{ border: '1px solid red' }}>
      <Stack spacing={2} direction="row">
        <ButtonGroup>
          <Button onClick={() => setView(ViewEnum.Card)}>Card View</Button>
          <Button onClick={() => setView(ViewEnum.Table)}>Table View</Button>
        </ButtonGroup>
      </Stack>
      <Stack direction="row">
        <ToolListFilters tools={tools} setFilters={setFilters} filters={filters} />
        <Box flex={1}>{viewEl}</Box>
      </Stack>
    </Box>
  )
}

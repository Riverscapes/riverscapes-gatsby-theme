import { Box, Button, Stack, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2/Grid2'
import ViewListIcon from '@mui/icons-material/ViewList'
import DashboardIcon from '@mui/icons-material/Dashboard'
import React, { useMemo } from 'react'
import { Tool, ToolListFilterValues } from './types'
import { ToolListCardView } from './ToolListCardView'
import { ToolListTableView } from './ToolListTableView'
import { ToolListFilters } from './ToolListFilters'

export interface ToolListProps {
  name: string
  initialFilters: ToolListFilterValues
  tools: Tool[]
}

const ViewEnum = {
  Card: 'Card',
  Table: 'Table',
}

export const ToolList: React.FC<ToolListProps> = ({ name, initialFilters, tools }) => {
  const [filters, setFilters] = React.useState(initialFilters)
  const [view, setView] = React.useState(ViewEnum.Card)

  const viewEl = useMemo(() => {
    const filteredTools = tools.filter((tool) => {
      if (filters.purpose.length > 0) {
        if (!filters.purpose.some((value) => tool.purpose.includes(value))) {
          return false
        }
      }
      if (filters.compliance.length > 0) {
        if (!filters.compliance.some((value) => tool.compliance.includes(value))) {
          return false
        }
      }
      if (filters.interface.length > 0) {
        if (!filters.interface.some((value) => tool.interface.includes(value))) {
          return false
        }
      }
      if (filters.resolution.length > 0) {
        if (!filters.resolution.some((value) => tool.resolution.includes(value))) {
          return false
        }
      }
      return true
    })

    switch (view) {
      case ViewEnum.Card:
        return <ToolListCardView tools={filteredTools} />
      case ViewEnum.Table:
        return <ToolListTableView tools={filteredTools} />
    }
  }, [view, tools, filters])

  const viewButtonIcon = view === ViewEnum.Card ? <ViewListIcon /> : <DashboardIcon />
  const viewButtonLabel = view === ViewEnum.Card ? 'Table View' : 'Card View'
  const viewButtonAction = view === ViewEnum.Card ? ViewEnum.Table : ViewEnum.Card

  return (
    <Box sx={{ py: 1 }}>
      <Stack spacing={2}>
        <Box>
          <Grid container spacing={3}>
            <Grid xs={6} sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant={'h6'} sx={{ fontWeight: 'bold' }}>
                {name}
              </Typography>
            </Grid>
            <Grid xs={6} sx={{ textAlign: 'right' }}>
              <Button endIcon={viewButtonIcon} onClick={() => setView(viewButtonAction)}>
                {viewButtonLabel}
              </Button>
            </Grid>
          </Grid>
        </Box>

        <Box>
          <Grid container spacing={3}>
            <Grid xs={4}>
              <ToolListFilters tools={tools} setFilters={setFilters} filters={filters} />
            </Grid>
            <Grid xs={8}>
              <Box>{viewEl}</Box>
            </Grid>
          </Grid>
        </Box>
      </Stack>
    </Box>
  )
}

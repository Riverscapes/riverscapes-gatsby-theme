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
  customFilterOptions?: ToolListFilterValues
  initialFilters: ToolListFilterValues
  tools: Tool[]
}

const ViewEnum = {
  Card: 'Card',
  Table: 'Table',
}

export const ToolList: React.FC<ToolListProps> = ({ initialFilters, tools, customFilterOptions }) => {
  const [filters, setFilters] = React.useState(initialFilters)
  const [view, setView] = React.useState(ViewEnum.Card)

  const viewEl = useMemo(() => {
    const filteredTools = tools.filter((tool) => {
      // List of filter categories
      const filterGroups = Object.keys(filters)

      // Include tool if passes for all filter groups
      return filterGroups.every((key) => {
        if (filters[key].length === 0) {
          return true
        }

        // Iterate over filter values, return true if any in tool values
        return filters[key].some((value) => tool[key].includes(value))
      })
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
      <Stack spacing={1}>
        {/* 
          <Button endIcon={viewButtonIcon} onClick={() => setView(viewButtonAction)}>
            {viewButtonLabel}
          </Button>
         */}

        <Box>
          <Grid container spacing={3}>
            <Grid xs={4}>
              <ToolListFilters
                tools={tools}
                setFilters={setFilters}
                filters={filters}
                customFilterOptions={customFilterOptions}
              />
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

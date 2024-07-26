import { Box, Button, Typography, Stack, FormGroup, FormControlLabel, Checkbox } from '@mui/material'
import React, { useMemo } from 'react'
import { Tool, ToolListFilterValues } from './types'

export type ToolListFilters = {
  grade: string[]
  compliance: string[]
  interface: string[]
  extent: string[]
  resolution: string[]
}

export interface ToolListFilterProps {
  tools: Tool[]
  setFilters: (filters: any) => void
  filters: ToolListFilterValues
  customFilterOptions?: ToolListFilterValues
}

const filterSectionNames = {
  grade: 'Tool Grade',
  compliance: 'RC standards compliance level/grade',
  interface: 'Interface',
  extent: 'Extent',
  resolution: 'Resolution',
}

export const ToolListFilters: React.FC<ToolListFilterProps> = ({ tools, setFilters, filters, customFilterOptions }) => {
  const filterList = useMemo(() => {
    const gradeSet = new Set<string>(customFilterOptions?.grade)
    const complianceSet = new Set<string>(customFilterOptions?.compliance)
    const interfaceSet = new Set<string>(customFilterOptions?.interface)
    const extentSet = new Set<string>(customFilterOptions?.extent)
    const resolutionSet = new Set<string>(customFilterOptions?.resolution)

    tools.forEach((tool) => {
      tool.grade.forEach((grade) => gradeSet.add(grade))
      tool.compliance.forEach((compliance) => complianceSet.add(compliance))
      tool.interface.forEach((interface_) => interfaceSet.add(interface_))
      tool.extent.forEach((extent) => extentSet.add(extent))
      tool.resolution.forEach((resolution) => resolutionSet.add(resolution))
    })

    return {
      grade: Array.from(gradeSet),
      compliance: Array.from(complianceSet),
      interface: Array.from(interfaceSet),
      extent: Array.from(extentSet),
      resolution: Array.from(resolutionSet),
    }
  }, [tools])

  return (
    <Box>
      <Box sx={{ textAlign: 'right' }}>
        <Button
          sx={{ my: 0, height: '1.25rem' }}
          size="small"
          onClick={() => {
            setFilters({
              grade: [],
              compliance: [],
              interface: [],
              extent: [],
              resolution: [],
            })
          }}
        >
          <Typography variant="overline">Clear Filters</Typography>
        </Button>
      </Box>
      <Stack spacing={2}>
        {Object.keys(filterList).map((key) => (
          <Stack key={key} spacing={1} sx={{ border: '1px solid black', p: 2 }}>
            <Typography>{filterSectionNames[key]}</Typography>
            <FormGroup>
              {filterList[key].map((value) => (
                <FormControlLabel
                  key={value}
                  control={
                    <Checkbox
                      checked={filters[key].includes(value)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFilters({
                            ...filters,
                            [key]: [...filters[key], value],
                          })
                        } else {
                          setFilters({
                            ...filters,
                            [key]: filters[key].filter((v) => v !== value),
                          })
                        }
                      }}
                    />
                  }
                  label={value}
                />
              ))}
            </FormGroup>
          </Stack>
        ))}
      </Stack>
    </Box>
  )
}

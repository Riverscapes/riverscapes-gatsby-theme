import { Box, Typography, Stack, FormGroup, FormControlLabel, Checkbox } from '@mui/material'
import React, { useMemo } from 'react'
import { Tool, ToolListFilterValues } from './types'

export type ToolListFilters = {
  purpose: string[]
  compliance: string[]
  interface: string[]
  resolution: string[]
}

export interface ToolListFilterProps {
  tools: Tool[]
  setFilters: (filters: any) => void
  filters: ToolListFilterValues
}

const filterSectionNames = {
  purpose: 'Type or Purpose',
  compliance: 'RC standards compliance level/grade',
  interface: 'Interface',
  resolution: 'Resolution',
}

export const ToolListFilters: React.FC<ToolListFilterProps> = ({ tools, setFilters, filters }) => {
  const filterList = useMemo(() => {
    const purposeSet = new Set<string>()
    const complianceSet = new Set<string>()
    const interfaceSet = new Set<string>()
    const resolutionSet = new Set<string>()

    tools.forEach((tool) => {
      tool.purpose.forEach((purpose) => purposeSet.add(purpose))
      tool.compliance.forEach((compliance) => complianceSet.add(compliance))
      tool.interface.forEach((interface_) => interfaceSet.add(interface_))
      tool.resolution.forEach((resolution) => resolutionSet.add(resolution))
    })

    return {
      purpose: Array.from(purposeSet),
      compliance: Array.from(complianceSet),
      interface: Array.from(interfaceSet),
      resolution: Array.from(resolutionSet),
    }
  }, [tools])

  return (
    <Stack spacing={2}>
      {Object.keys(filterList).map((key) => (
        <Stack key={key} spacing={1} sx={{ border: '1px solid black', p: 1 }}>
          <Typography>{filterSectionNames[key]}</Typography>
          <FormGroup>
            {filterList[key].sort().map((value) => (
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
  )
}

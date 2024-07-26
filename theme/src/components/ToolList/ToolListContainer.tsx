import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import { ToolListFilterValues } from './types'
import { ToolList } from './ToolList'

export interface ToolListContainerProps {
  customFilterOptions?: ToolListFilterValues
  initialFilters?: ToolListFilterValues
}

export const ToolListContainer: React.FC<ToolListContainerProps> = ({ initialFilters, customFilterOptions }) => {
  const data = useStaticQuery(graphql`
    query ToolsQuery {
      allToolsJson {
        nodes {
          toolId
          name
          description
          url
          grade
          compliance
          interface
          extent
          resolution
        }
      }
    }
  `)
  const allTools = data.allToolsJson.nodes

  // If there is real content (from user JSON), filter out the default empty tool
  let tools
  const hasRealContent = allTools.some((tool) => tool.name.trim() !== '' && tool.toolId !== 'PLACEHOLDER')
  if (hasRealContent) {
    tools = allTools.filter((tool) => tool.name.trim() !== '' && tool.toolId !== 'PLACEHOLDER')
  } else {
    tools = allTools
  }

  // Ensure that the initial filter options have empty keys for all categories
  const initialFiltersAll = {
    grade: [],
    compliance: [],
    interface: [],
    extent: [],
    resolution: [],
    ...initialFilters,
  }

  return <ToolList initialFilters={initialFiltersAll} tools={tools} customFilterOptions={customFilterOptions} />
}

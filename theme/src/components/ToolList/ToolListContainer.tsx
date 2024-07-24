import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import { ToolListFilterValues } from './types'
import { ToolList } from './ToolList'

export interface ToolListContainerProps {
  name: string
  initialFilters?: ToolListFilterValues
}

export const ToolListContainer: React.FC<ToolListContainerProps> = ({ name, initialFilters }) => {
  const data = useStaticQuery(graphql`
    query ToolsQuery {
      allToolsJson {
        nodes {
          toolId
          name
          description
          url
          purpose
          compliance
          interface
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

  if (!initialFilters) {
    initialFilters = {
      purpose: [],
      compliance: [],
      interface: [],
      resolution: [],
    }
  }

  return <ToolList name={name} initialFilters={initialFilters} tools={tools} />
}

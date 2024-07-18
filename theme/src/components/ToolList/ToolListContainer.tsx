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
  const tools = data.allToolsJson.nodes

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
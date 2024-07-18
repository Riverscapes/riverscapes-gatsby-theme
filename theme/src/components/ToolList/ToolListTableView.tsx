import { List, ListItemButton, ListItemText, Link } from '@mui/material'
import React from 'react'
import { Tool } from './types'

export interface ToolListTableViewProps {
  tools: Tool[]
}

export const ToolListTableView: React.FC<ToolListTableViewProps> = ({ tools }) => {
  return (
    <List>
      {tools.map((tool) => (
        <ListItemButton key={tool.toolId} href={tool.url} target="_blank">
          <ListItemText primary={tool.name} secondary={tool.description} />
        </ListItemButton>
      ))}
    </List>
  )
}

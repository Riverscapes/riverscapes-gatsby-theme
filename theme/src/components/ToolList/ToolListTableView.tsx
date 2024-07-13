import { List, ListItem, ListItemText } from '@mui/material'
import React from 'react'
import { Tool } from './types'

export interface ToolListTableViewProps {
  tools: Tool[]
}

export const ToolListTableView: React.FC<ToolListTableViewProps> = ({ tools }) => {
  return (
    <List>
      {tools.map((tool) => (
        <ListItem key={tool.id}>
          <ListItemText primary={tool.name} secondary={tool.description} />
        </ListItem>
      ))}
    </List>
  )
}

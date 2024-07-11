import { Web } from '@mui/icons-material'
import { IconButton, List, ListItem, ListItemSecondaryAction, ListItemText } from '@mui/material'
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
          <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="delete">
              <Web />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  )
}

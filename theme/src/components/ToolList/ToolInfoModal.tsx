import { Box, Typography, Link, Button, DialogTitle, Dialog } from '@mui/material'
import React from 'react'
import { Tool } from './types'

export interface ToolInfoModalProps {
  open: boolean
  tool: Tool
  onClose: () => void
}

export const ToolInfoModal: React.FC<ToolInfoModalProps> = ({ open, tool, onClose }) => {
  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>{tool.name}</DialogTitle>
      <Box p={2}>
        Hey! You bognog?
        <Typography>{tool.description}</Typography>
        <Link href={tool.url}>{tool.url}</Link>
      </Box>
    </Dialog>
  )
}

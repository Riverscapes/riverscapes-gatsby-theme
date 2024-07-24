import { Box, Typography, Link, DialogTitle, Dialog, DialogContent, Stack, IconButton, Chip } from '@mui/material'
import React from 'react'
import { Tool } from './types'
import CloseIcon from '@mui/icons-material/Close'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'

export interface ToolInfoModalProps {
  open: boolean
  tool: Tool
  onClose: () => void
}

export const ToolInfoModal: React.FC<ToolInfoModalProps> = ({ open, tool, onClose }) => {
  return (
    <Dialog onClose={onClose} open={open} maxWidth={'md'} fullWidth={true}>
      <DialogTitle sx={{ mr: 3 }} variant="h3">
        {tool.name}
        <Typography variant="subtitle2">
          <Link href={tool.url} target={'_blank'}>
            {tool.url.replace('https://', '')}
            {tool.url.includes('riverscapes.net') ? '' : <OpenInNewIcon sx={{ fontSize: 16 }} />}
          </Link>
        </Typography>
      </DialogTitle>

      <IconButton aria-label="close" onClick={onClose} sx={{ position: 'absolute', top: 0, right: 0, mt: 1, mr: 1 }}>
        <CloseIcon />
      </IconButton>

      <DialogContent sx={{ pt: 1 }}>
        <Box sx={{ mb: 1 }}>
          <Typography>{tool.description}</Typography>
        </Box>

        <Stack spacing={1}>
          {['purpose', 'compliance', 'interface', 'resolution'].map((key) => {
            return (
              <Stack key={key} direction="row" spacing={1}>
                <Typography variant="overline">{key.charAt(0).toUpperCase() + key.slice(1) + ':'}</Typography>
                {tool[key].map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Stack>
            )
          })}
        </Stack>
      </DialogContent>
    </Dialog>
  )
}

import {
  Box,
  Typography,
  Link,
  DialogTitle,
  Dialog,
  DialogContent,
  Stack,
  IconButton,
  Chip,
  useTheme,
  Button,
} from '@mui/material'
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
  const theme = useTheme()

  return (
    <Dialog onClose={onClose} open={open} maxWidth={'md'} fullWidth={true}>
      <DialogTitle sx={{ color: theme.palette.primary.contrastText, backgroundColor: theme.palette.primary.light }}>
        <Stack direction={'row'} flexDirection={'row'} justifyContent={'space-between'} alignItems={'flex-start'}>
          <Stack>
            <Typography component="div" variant="h3" color={'inherit'}>
              {tool.name}
            </Typography>
            <Box>
              <Button size="small" href={tool.url} target={'_blank'} color={'inherit'} endIcon={<OpenInNewIcon />}>
                {tool.url.replace('https://', '')}
              </Button>
            </Box>
          </Stack>

          <IconButton aria-label="close" onClick={onClose} color={'inherit'}>
            <CloseIcon />
          </IconButton>
        </Stack>
      </DialogTitle>

      <DialogContent>
        <Box sx={{ py: 2 }}>
          <Typography sx={{ whiteSpace: 'preserve-breaks' }}>{tool.description}</Typography>
        </Box>

        <Stack spacing={1}>
          {['grade', 'compliance', 'interface', 'extent', 'resolution'].map((key) => {
            if (tool[key].length === 0) {
              return
            }
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

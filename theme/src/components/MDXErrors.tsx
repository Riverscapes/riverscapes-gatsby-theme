import React from 'react'
import { Box } from '@mui/material'
import 'prismjs/themes/prism-dark.css'

export const ErrorLiquidText = ({ children }) => {
  return (
    <span
      style={{
        padding: '0.1rem 0.5rem',
        backgroundColor: 'red',
        color: 'white',
      }}
    >
      LIQUIDTAG: &quot;{children}&quot;
    </span>
  )
}

export const ErrorUnclosed = ({ children, tagName = 'hr' }) => {
  return (
    <Box
      sx={{
        position: 'relative',
        backgroundColor: 'red',
        // Make the border a a barberpole caution effect 10px wide between white and red
        padding: '10px',
        backgroundImage:
          'linear-gradient(45deg, white 25%, transparent 25%, transparent 50%, white 50%, white 75%, transparent 75%, transparent)',
        backgroundSize: '10px 10px',
        '&::before': {
          content: `"Unclosed Tag: <${tagName}> ==> <${tagName} />"`,
          color: 'white',
          background: 'red',
          position: 'absolute',
          top: '0',
          left: '0',
          fontWeight: 'bold',
        },
      }}
    >
      <Box sx={{ background: 'white' }}>{children}</Box>
    </Box>
  )
}

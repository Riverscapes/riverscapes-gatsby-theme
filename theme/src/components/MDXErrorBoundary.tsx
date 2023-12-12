import React from 'react'
import { Typography, Alert, AlertTitle, Box } from '@mui/material'
import 'prismjs/themes/prism-dark.css'
import log from 'loglevel'

interface ErrorBoundaryProps {
  children: React.ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

class MDXErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false, error: null }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    log.error('Uncaught error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      const stack = (this.state.error?.stack || '')
        .split('\n')
        .filter((line) => !line.includes('node_modules'))
        .join('\n')
      return (
        <>
          <Alert severity="error" variant="filled">
            <AlertTitle>Markdown Error</AlertTitle>
            <Typography paragraph>Something went wrong while rendering the MDX content.</Typography>
            {this.state.error?.message && (
              <Typography paragraph variant="overline">
                ERROR MESSAGE: &quot;{this.state.error?.message}&quot;
              </Typography>
            )}
            {/* Now the stack trace */}
            {this.state.error?.stack && (
              <Box
                sx={{
                  fontFamily: 'monospace',
                  fontSize: '0.8rem',
                }}
              >
                <pre>
                  <code>{stack}</code>
                </pre>
              </Box>
            )}
          </Alert>
        </>
      )
    }

    return this.props.children
  }
}

export default MDXErrorBoundary

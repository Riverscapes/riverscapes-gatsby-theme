import React from 'react'
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles'
import { theme } from '../muiTheme'
import { Box, CssBaseline } from '@mui/material'

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <CssBaseline />
      <Box className="global-wrapper">
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <Box component="main">
              <Box
                component="article"
                itemScope
                itemType="http://schema.org/Article"
                sx={{
                  position: 'relative',
                }}
              >
                {children}
              </Box>
            </Box>
          </ThemeProvider>
        </StyledEngineProvider>
      </Box>
    </>
  )
}

export default Layout

import React from 'react'
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles'
import { theme } from '../muiTheme'
import Header from './Header'
import Footer from './Footer'
import { Box, CssBaseline } from '@mui/material'

interface LayoutProps {
  location: Location
  title: string
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath

  return (
    <div>
      <CssBaseline />
      <Box className="global-wrapper" data-is-root-path={isRootPath}>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <Header />
            <Box component="main">{children}</Box>
            <Footer />
          </ThemeProvider>
        </StyledEngineProvider>
      </Box>
    </div>
  )
}

export default Layout

import React, { useState } from 'react'
import { Link } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import { Box, Button, Container, Stack, SxProps, Theme, useMediaQuery, useTheme } from '@mui/material'
import Menu from './menus/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import { RSStaticImage } from './custom/RSStaticImage'

const stylesThunk = (theme: Theme): Record<string, SxProps<Theme>> => ({
  wrapper: {
    background: theme.palette.primary.main,
  },
  container: {
    background: theme.palette.primary.main,
    overflow: 'auto',
  },
  content: {
    mt: 4,
    mb: 4,
    maxWidth: theme.breakpoints.values.xl,
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: 4,
  },
  logo: {
    paddingLeft: 2,
    paddingRight: 2,
    flexGrow: 0,
    minWidth: {
      md: '150px',
    },
  },
  menuButton: {
    placeSelf: 'center right',
    m: [0, 2],
  },
  menu: {
    flexGrow: 1,
  },
  // mobileMenu: {
  //   width: '100%',
  // },
})

const Header: React.FC = () => {
  const theme = useTheme()
  const styles = stylesThunk(theme)
  const isXL = useMediaQuery(theme.breakpoints.up('xl'))
  const [mobileMenu, setMobileMenu] = useState(false)

  const handleMobileMenuChange = () => {
    setMobileMenu((prev) => !prev)
  }

  return (
    <Box sx={styles.wrapper}>
      <Container sx={styles.container} maxWidth={'xl'}>
        <Stack sx={styles.content} direction="row" alignItems={'center'} justifyContent={'space-between'}>
          <Box sx={styles.logo}>
            <Link to="/">
              <RSStaticImage src="/images/logo.png" width={228} alt="Riverscapes Consortium logo" />
            </Link>
          </Box>
          {!isXL ? (
            <Box sx={styles.menuButton}>
              <Button onClick={handleMobileMenuChange} variant="text" sx={{ color: '#fff' }} startIcon={<MenuIcon />}>
                Menu
              </Button>
            </Box>
          ) : (
            <Box sx={styles.menu}>
              <Menu menuOption="full" horizontal mobileMenuState={mobileMenu} invert />
            </Box>
          )}
        </Stack>
      </Container>
      <StaticImage
        layout="fullWidth"
        formats={['auto', 'webp', 'avif']}
        src="../images/header-border.png"
        quality={95}
        alt="Wave Pattern"
      />
      {!isXL && (
        <Box sx={styles.mobileMenu}>
          <Menu menuOption="full" horizontal mobileMenuState={mobileMenu} invert />
        </Box>
      )}
    </Box>
  )
}

export default Header

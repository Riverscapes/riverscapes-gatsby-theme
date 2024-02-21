/**
 * Main Menu component using MUI
 */

import React, { useState, useRef, useEffect } from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import {
  Button,
  ButtonGroup,
  Slide,
  Box,
  Popper,
  Paper,
  MenuItem,
  ClickAwayListener,
  useTheme,
  useMediaQuery,
  Stack,
  IconButton,
} from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import SearchIcon from '@mui/icons-material/Search'
import { MobileMenu } from '../../types'
import SideNav from './SideNav'
import MenuButton from './MenuButton'

interface MainMenuProps {
  mobileMenuState: boolean
}

const MainMenu: React.FC<MainMenuProps> = ({ mobileMenuState }) => {
  const theme = useTheme()
  const isXL = useMediaQuery(theme.breakpoints.up('xl'))
  const data = useStaticQuery(graphql`
    query HeaderQuery {
      site {
        siteMetadata {
          menuLinks {
            url
            title
            items {
              url
              title
            }
          }
        }
      }
    }
  `)

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const menu = data.site.siteMetadata.menuLinks

  const [anchorEl, setAnchorEl] = useState([])

  const containerRef = useRef(null)
  const menuRef = useRef([])

  useEffect(() => {
    menuRef.current = menuRef.current.slice(0, menu.length)
  }, [menu])

  // const open = Boolean(anchorEl);
  const handleClick = (event) => {
    const id = event.currentTarget.id
    const newArr = [...anchorEl]
    newArr[id] = menuRef.current[id]
    setAnchorEl(newArr)
  }
  const handleClose = (event) => {
    const newArr = []
    setAnchorEl(newArr)
  }

  const mobileMenu: MobileMenu = {
    items: menu,
  }

  if (isXL)
    return (
      <Stack
        direction="row"
        justifyContent="flex-end"
        gap={3}
        sx={{
          width: '100%',
          color: 'white',
        }}
      >
        {menu.map((link, key) =>
          link.items ? (
            <React.Fragment key={key}>
              <ButtonGroup
                variant="text"
                aria-label="dropdown menu"
                ref={(el) => (menuRef.current[key] = el)}
                sx={{
                  p: 0,
                }}
              >
                <Button
                  color="inherit"
                  component={Link}
                  to={link.url}
                  key={key}
                  sx={{ px: 0 }}
                  endIcon={
                    <IconButton
                      id={`${key}`}
                      aria-haspopup="true"
                      aria-controls={anchorEl[`${key}`] ? `menu-${key}` : undefined}
                      aria-expanded={anchorEl[`${key}`] ? 'true' : undefined}
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        handleClick(e)
                      }}
                    >
                      <KeyboardArrowDownIcon color="inherit" />
                    </IconButton>
                  }
                >
                  {link.title}
                </Button>
              </ButtonGroup>
              <Popper
                id={`menu-${key}`}
                open={Boolean(anchorEl[`${key}`])}
                anchorEl={anchorEl[`${key}`]}
                placement="bottom-start"
              >
                <ClickAwayListener onClickAway={handleClose}>
                  <Paper
                    square
                    sx={{
                      p: 2,
                      minWidth: 18,
                    }}
                  >
                    {link.items.map((dropdownItem, itemIndex) => (
                      <MenuItem key={itemIndex} onClick={handleClose} divider>
                        <MenuButton
                          to={dropdownItem.url}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                          }}
                        >
                          <KeyboardArrowRightIcon
                            fontSize="small"
                            onClick={(e) => {
                              e.preventDefault()
                              e.stopPropagation()
                            }}
                          />
                          {dropdownItem.title}
                        </MenuButton>
                      </MenuItem>
                    ))}
                  </Paper>
                </ClickAwayListener>
              </Popper>
            </React.Fragment>
          ) : (
            <Button
              component={Link}
              to={link.url}
              key={key}
              color="inherit"
              startIcon={link.title === 'Search' ? <SearchIcon /> : ''}
              variant="text"
            >
              {link.title}
            </Button>
          )
        )}
      </Stack>
    )

  // Here's the small mobile menu
  return (
    <Box sx={{ width: 1 }}>
      <Box sx={{ overflow: 'hidden' }} ref={containerRef}>
        <Slide
          direction="down"
          in={mobileMenuState}
          appear={false}
          container={containerRef.current}
          mountOnEnter
          unmountOnExit
        >
          <Paper>
            <SideNav content={mobileMenu} theme="white" showHeading={false} />
          </Paper>
        </Slide>
      </Box>
    </Box>
  )
}

export default MainMenu

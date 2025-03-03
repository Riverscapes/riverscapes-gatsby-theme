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
  const isLargerScreen = useMediaQuery(theme.breakpoints.up('lg'))
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

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const containerRef = useRef(null)
  const menuRef = useRef([])

  useEffect(() => {
    menuRef.current = menuRef.current.slice(0, menu.length)
  }, [menu])

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    const sameMenu = anchorEl === event.currentTarget
    if (sameMenu) {
      setAnchorEl(null)
    } else {
      setAnchorEl(event.currentTarget) // Otherwise, set the new anchor
    }
  }
  const handleClose = () => {
    // Close the menu when clicking away
    setAnchorEl(null)
  }

  const mobileMenu: MobileMenu = {
    items: menu,
  }

  if (isLargerScreen)
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
                  sx={{ px: 0, whiteSpace: 'nowrap', minWidth: 'auto' }}
                  endIcon={
                    <IconButton
                      id={`${key}`}
                      aria-haspopup="true"
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
                open={Boolean(anchorEl && anchorEl.id === `${key}`)} // Open only if it's the active menu
                anchorEl={anchorEl} // Set the active menu position
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
                      <MenuItem
                        key={itemIndex}
                        onClick={handleClose}
                        divider
                        sx={{
                          whiteSpace: 'nowrap',
                        }}
                      >
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
              sx={{ whiteSpace: 'nowrap' }}
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

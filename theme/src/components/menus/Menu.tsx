/**
 * Menu component
 */

import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import MainMenu from './MainMenu'
import { Box, Stack } from '@mui/material'
import MenuButton from './MenuButton'

interface MenuProps {
  horizontal?: boolean
  invert?: boolean
  menuOption?: 'full' | 'list'
  mobileMenuState?: boolean
}

const Menu: React.FC<MenuProps> = ({
  horizontal = false,
  invert = false,
  menuOption = 'list',
  mobileMenuState = false,
}) => {
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

  const listMenu = (menu) => {
    return menu.map((link, key) => (
      <Box key={key}>
        <MenuButton
          sx={{
            color: 'white',
            p: 0,
            '&:hover': {
              textDecoration: 'underline',
            },
          }}
          to={link.url}
        >
          {link.title}
        </MenuButton>
      </Box>
    ))
  }

  return (
    <Stack
      direction={horizontal ? 'row' : 'column'}
      gap={{
        xs: 0,
        lg: 2,
      }}
      sx={{
        '& *': {
          color: invert ? 'white' : undefined,
        },
        width: '100%;',
      }}
    >
      {menuOption === 'list' ? listMenu(menu) : <MainMenu mobileMenuState={mobileMenuState} />}
    </Stack>
  )
}

export default Menu

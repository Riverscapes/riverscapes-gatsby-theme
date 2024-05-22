import React from 'react'
import Typography from '@mui/material/Typography'
import { TreeView } from '@mui/x-tree-view/TreeView'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import TreeItemLink from './TreeItemLink'
import { MobileMenu, MobileMenuItem } from '../../types'
import { Box, IconButton } from '@mui/material'

interface SideNavProps {
  heading?: string
  headingType?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5'
  content: MobileMenu
  showHeading: boolean
  theme?: 'white' | 'none'
}

type RecursiveReturn = {
  el: JSX.Element
  isCurrent: boolean
}

const SideNav: React.FC<SideNavProps> = ({
  heading = '',
  headingType = 'h2',
  showHeading = true,
  content = { items: [] },
  theme = 'none',
}) => {
  const navHeading = showHeading ? (
    <Typography
      sx={{
        mb: 3,
      }}
      component={headingType}
      variant="sideMenu"
    >
      {heading}
    </Typography>
  ) : (
    ''
  )

  const defaultExpanded = []

  const renderTree = (nodes: MobileMenu | MobileMenuItem, key: string, level: number): RecursiveReturn => {
    const nextLevel = level + 1
    const currentKey = `${level}${key}`
    const nodesItem = nodes as MobileMenuItem
    const nodesMenu = nodes as MobileMenu

    // Make sure to remove any trailing slashes
    const currPath = window.location.pathname.replace(/\/$/, '')
    let isCurrent = nodesItem.url && currPath === nodesItem.url

    return {
      el: (
        <TreeItemLink key={currentKey} nodeId={`${currentKey}`} to={nodesItem.url} label={nodesItem.title}>
          {nodesMenu.items && Array.isArray(nodesMenu.items)
            ? nodesMenu.items.map((node, nodekey) => {
                const { el, isCurrent: isCurrentInner } = renderTree(node, `${level}${nodekey}`, nextLevel)
                if (isCurrentInner) defaultExpanded.push(`${currentKey}`)
                isCurrent = isCurrent || isCurrentInner
                return el
              })
            : null}
        </TreeItemLink>
      ),
      isCurrent,
    }
  }

  const contentItem = (node: MobileMenuItem[]) => {
    const level = 0
    return (node || []).map((item, key) => {
      return renderTree(item, `${key}`, level).el
    })
  }

  return (
    <Box
      sx={{
        mt: showHeading ? 4 : 0,
        backgroundColor: theme === 'white' ? 'white' : undefined,
      }}
    >
      {navHeading}
      <TreeView
        aria-label="Side Navigation"
        defaultExpanded={defaultExpanded}
        disableSelection
        disabledItemsFocusable
        defaultCollapseIcon={
          <IconButton
            size="medium"
            sx={{ mr: 1 }}
            onClick={(e) => {
              // e.preventDefault()
              // e.stopPropagation()
            }}
          >
            <ExpandMoreIcon />
          </IconButton>
        }
        defaultExpandIcon={
          <IconButton
            size="medium"
            sx={{ mr: 1 }}
            onClick={(e) => {
              // e.preventDefault()
              // e.stopPropagation()
            }}
          >
            <ChevronRightIcon />
          </IconButton>
        }
      >
        {content ? contentItem(content.items) : null}
      </TreeView>
    </Box>
  )
}

export default SideNav

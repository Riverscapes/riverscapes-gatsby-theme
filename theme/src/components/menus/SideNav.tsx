import React from 'react'
import Typography from '@mui/material/Typography'
import TreeView from '@mui/lab/TreeView'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import TreeItemLink from './TreeItemLink'
import { MobileMenu, MobileMenuItem } from '../../types'
import { Box } from '@mui/material'

interface SideNavProps {
  heading?: string
  headingType?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5'
  content: MobileMenu
  showHeading: boolean
  theme?: 'white' | 'none'
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
      variant="h2"
    >
      {heading}
    </Typography>
  ) : (
    ''
  )

  const renderTree = (nodes: MobileMenu | MobileMenuItem, key: string, level: number) => {
    const nextLevel = level + 1
    const currentKey = `${level}${key}`
    const nodesItem = nodes as MobileMenuItem
    const nodesMenu = nodes as MobileMenu

    return (
      <TreeItemLink key={currentKey} nodeId={`${currentKey}`} to={nodesItem.url} label={nodesItem.title}>
        {nodesMenu.items && Array.isArray(nodesMenu.items)
          ? nodesMenu.items.map((node, nodekey) => renderTree(node, `${level}${nodekey}`, nextLevel))
          : null}
      </TreeItemLink>
    )
  }

  const contentItem = (node: MobileMenuItem[]) => {
    const level = 0
    return (node || []).map((item, key) => {
      return renderTree(item, `${key}`, level)
    })
  }

  return (
    <Box
      sx={{
        mt: 4,
        backgroundColor: theme === 'white' ? 'white' : undefined,
      }}
    >
      {navHeading}
      <TreeView
        aria-label="Side Navigation"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
      >
        {contentItem(content.items)}
      </TreeView>
    </Box>
  )
}

export default SideNav

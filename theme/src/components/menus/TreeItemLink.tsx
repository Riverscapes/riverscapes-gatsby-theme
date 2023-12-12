/**
 * TreeItemLink component
 */

import React from 'react'
import { navigate } from 'gatsby'
import { TreeItem, TreeItemProps } from '@mui/x-tree-view/TreeItem'
import { useTheme } from '@mui/material'

interface TreeItemLinkProps extends TreeItemProps {
  to: string
  label: string
  children: React.ReactNode
}

const TreeItemLink: React.FC<TreeItemLinkProps> = ({ to, label, children, ...rest }) => {
  const theme = useTheme()
  return (
    <TreeItem
      onClick={(event) => {
        if (to.startsWith('#')) {
          const element = document.getElementById(to)
          event.preventDefault()
          element.scrollIntoView()
        } else navigate(to)
      }}
      sx={{
        '& .MuiTreeItem-content': {
          borderBottom: '1px solid #bbcd3f',
          py: 1,
        },
        '& .MuiTreeItem-label': {
          color: theme.palette.text.primary,
          fontSize: '1.2rem',
        },
        '& .MuiTreeItem-group': {
          ml: 0,
        },
        '& a': {
          color: theme.palette.text.primary,
          textDecoration: 'none',
        },
        '& .MuiTreeItem-iconContainer': {
          color: '#0661C1',
        },
      }}
      label={label}
      {...rest}
    >
      {children}
    </TreeItem>
  )
}

export default TreeItemLink

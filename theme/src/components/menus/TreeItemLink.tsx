/**
 * TreeItemLink component
 */

import React from 'react'
import { navigate } from 'gatsby'
import { TreeItem, TreeItemProps } from '@mui/x-tree-view/TreeItem'
import { Button, useTheme } from '@mui/material'
import { Place } from '@mui/icons-material'

interface TreeItemLinkProps extends TreeItemProps {
  to: string
  label: string
  children: React.ReactNode
}

const TreeItemLink: React.FC<TreeItemLinkProps> = ({ to, label, children, ...rest }) => {
  const theme = useTheme()
  // Make sure to remove any trailing slashes
  let currPath = ''
  if (typeof window !== 'undefined') {
    currPath = window.location.pathname.replace(/\/$/, '')
  }
  const isCurrent = to && currPath === to
  const isLink = to && to.length > 0
  const isLeaf = !children || (Array.isArray(children) && children.length === 0)

  return (
    <TreeItem
      onClick={
        isLeaf && !isCurrent
          ? (e) => {
              e.preventDefault()
              e.stopPropagation()
              if (to.startsWith('#')) {
                const element = document.getElementById(to)
                e.preventDefault()
                element.scrollIntoView()
              } else if (to.length > 0) {
                // If it's not the current page then navigate to it
                if (!isCurrent) {
                  e.preventDefault()
                  navigate(to)
                }
              }
            }
          : undefined
      }
      sx={{
        pl: 2,
        '&:hover .MuiButton-root': {
          textDecoration: isLeaf && !isCurrent ? 'underline' : undefined,
        },
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
      label={
        <Button
          endIcon={isCurrent ? <Place /> : null}
          sx={{
            textAlign: 'left',
            color: isLink ? theme.palette.text.primary : theme.palette.text.secondary,
            fontWeight: isCurrent ? 'bold' : 'normal',
            // On hover, underline
            '&:hover': {
              textDecoration: !isCurrent ? 'underline' : undefined,
            },
          }}
          onClick={
            isLeaf || isCurrent
              ? undefined
              : (e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  if (to.startsWith('#')) {
                    const element = document.getElementById(to)
                    e.preventDefault()
                    element.scrollIntoView()
                  } else if (to.length > 0) {
                    // If it's not the current page then navigate to it
                    if (!isCurrent) {
                      e.preventDefault()
                      navigate(to)
                    }
                  }
                }
          }
        >
          {label}
        </Button>
      }
      {...rest}
    >
      {children}
    </TreeItem>
  )
}

export default TreeItemLink

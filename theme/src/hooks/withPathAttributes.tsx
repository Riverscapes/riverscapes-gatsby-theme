import { useLocation } from '@reach/router'
import { withPrefix } from 'gatsby'

export type PathAttributes = {
  isCurrent: boolean
  isLink: boolean
  isLeaf: boolean
}

export const withPathAttributes = (to?: string, children?: React.ReactNode): PathAttributes => {
  const location = useLocation()

  // Make sure to remove any trailing slashes
  const currPath = location.pathname ? location.pathname.replace(/\/$/, '') : ''
  const prefixedTo = withPrefix(to || '')

  const isCurrent = Boolean(prefixedTo && currPath === prefixedTo)
  const isLink = Boolean(prefixedTo && prefixedTo.length > 0)
  const isLeaf = Boolean(!children || (Array.isArray(children) && children.length === 0))

  return {
    isCurrent,
    isLink,
    isLeaf,
  }
}

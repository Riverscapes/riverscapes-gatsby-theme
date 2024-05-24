import { withPrefix } from 'gatsby'
import log from 'loglevel'

export type PathAttributes = {
  isCurrent: boolean
  isLink: boolean
  isLeaf: boolean
}

export const withPathAttributes = (to?: string, children?: React.ReactNode): PathAttributes => {
  // Make sure to remove any trailing slashes
  let currPath = ''
  const prefixedTo = withPrefix(to || '')
  if (typeof window !== 'undefined') {
    currPath = window.location.pathname.replace(/\/$/, '')
  } else {
    log.debug('window is undefined')
  }
  const isCurrent = Boolean(prefixedTo && currPath === prefixedTo)
  const isLink = Boolean(prefixedTo && prefixedTo.length > 0)
  const isLeaf = Boolean(!children || (Array.isArray(children) && children.length === 0))

  return {
    isCurrent,
    isLink,
    isLeaf,
  }
}

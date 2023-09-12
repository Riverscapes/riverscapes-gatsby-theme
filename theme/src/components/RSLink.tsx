/**
 * LinkButton component
 */

import React from 'react'
import { Link as MuiLink, LinkProps } from '@mui/material'
import { Link as GatsbyLink } from 'gatsby'

interface LinkButtonProps extends Omit<LinkProps, 'href'> {
  to: string
  children: React.ReactNode
}

export const RSLink: React.FC<LinkButtonProps> = ({ to, children, ...props }) => {
  const isExternal = to.startsWith('http')
  return isExternal ? (
    <MuiLink href={to} {...props} target={'_blank'}>
      {children}
    </MuiLink>
  ) : (
    <InternalLink to={to} {...props}>
      {children}
    </InternalLink>
  )
}

const InternalLink: React.FC<LinkButtonProps> = ({ to, children, ...props }) => {
  const CustomLinkStub = (props, ref) => <GatsbyLink to={to} {...props} ref={ref} />
  const Component = React.forwardRef(CustomLinkStub)

  return (
    <MuiLink component={Component} {...props}>
      {children}
    </MuiLink>
  )
}

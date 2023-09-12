import React from 'react'
import { Link as GatsbyLink } from 'gatsby'
import type { GatsbyLinkProps } from 'gatsby'

export interface LinkProps extends GatsbyLinkProps<unknown> {
  to: string
  children: React.ReactNode
}

const ContentLink: React.FC<LinkProps> = ({ to, children, ref, ...rest }) => {
  const CustomLinkStub = (props, ref) => <GatsbyLink to={to} {...rest} ref={ref} />
  const CustomLink = React.forwardRef(CustomLinkStub)
  return (
    <CustomLink to={to} {...rest}>
      {children}
    </CustomLink>
  )
}

export default ContentLink

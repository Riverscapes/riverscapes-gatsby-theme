/**
 * LinkButton component
 */

import React from 'react'
import { Button, ButtonProps } from '@mui/material'
import { Link as GatsbyLink } from 'gatsby'

interface LinkButtonProps extends ButtonProps {
  to: string
  target?: string
}

const MenuButton: React.FC<LinkButtonProps> = ({ to, target, ...props }) => {
  const CustomLinkStub = (props, ref) => <GatsbyLink to={to} {...props} ref={ref} target={target} />
  const CustomLink = React.forwardRef(CustomLinkStub)

  const isExternal = to.startsWith('http') || to.startsWith('mailto')

  return (
    <Button
      variant="text"
      href={isExternal ? to : undefined}
      component={isExternal ? undefined : CustomLink}
      {...props}
      target={isExternal ? '_blank' : target}
    />
  )
}

export default MenuButton

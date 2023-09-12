/**
 * LinkButton component
 */

import React from 'react'
import { Button, ButtonProps } from '@mui/material'
import { Link as GatsbyLink } from 'gatsby'

interface LinkButtonProps extends ButtonProps {
  to: string
}

const MenuButton: React.FC<LinkButtonProps> = ({ to, ...props }) => {
  const CustomLinkStub = (props, ref) => <GatsbyLink to={to} {...props} ref={ref} />
  const CustomLink = React.forwardRef(CustomLinkStub)

  return <Button variant="text" component={CustomLink} sx={{}} {...props} />
}

export default MenuButton

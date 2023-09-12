/**
 * LinkButton component
 */

import React from 'react'
import { Button, ButtonProps } from '@mui/material'
import { Link as GatsbyLink } from 'gatsby'

interface RSLinkButtonProps extends Omit<ButtonProps, 'href'> {
  to: string
  children: React.ReactNode
}

const RSLinkButton: React.FC<RSLinkButtonProps> = ({ to, children, ...props }) => {
  const isExternal = to.startsWith('http')

  return isExternal ? (
    <Button
      variant="contained"
      color="info"
      onClick={() => window.open(to, '_blank')}
      sx={{
        color: 'white',
        mt: 4,
      }}
      {...props}
    >
      {children}
    </Button>
  ) : (
    <InternalButton to={to} {...props}>
      {children}
    </InternalButton>
  )
}

const InternalButton: React.FC<RSLinkButtonProps> = ({ to, children, ...props }) => {
  const CustomLinkStub = (props, ref) => <GatsbyLink to={to} {...props} ref={ref} />
  const Component = React.forwardRef(CustomLinkStub)

  return (
    <Button
      variant="contained"
      color="info"
      component={Component}
      sx={{
        color: 'white',
        mt: 4,
      }}
      {...props}
    >
      {children}
    </Button>
  )
}

export default RSLinkButton

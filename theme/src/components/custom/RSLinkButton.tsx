/**
 * LinkButton component
 */

import React from 'react'
import { Button, ButtonProps, Stack, Typography, useTheme } from '@mui/material'
import { Link as GatsbyLink } from 'gatsby'
import * as allIcons from '@mui/icons-material'
import { RSIcon } from './RSIcon'

interface RSLinkButtonProps extends Omit<ButtonProps, 'href'> {
  to: string
  children: React.ReactNode
  iconName?: keyof typeof allIcons
  title: string
  subtitle?: string
}

const RSLinkButton: React.FC<RSLinkButtonProps> = ({ to, children, ...props }) => {
  const isExternal = to.startsWith('http')

  return isExternal ? (
    <FinalButton {...props} onClick={() => window.open(to, '_blank')}>
      {children}
    </FinalButton>
  ) : (
    <InternalButton to={to} {...props}>
      {children}
    </InternalButton>
  )
}

const FinalButton: React.FC<Omit<RSLinkButtonProps, 'to'>> = ({ iconName, title, subtitle, children, ...props }) => {
  const theme = useTheme()
  return (
    <Button
      variant="contained"
      color="primary"
      sx={{
        mt: 4,
        py: subtitle ? 0.5 : 1,
        pr: subtitle ? 4 : 3,
        textAlign: iconName ? 'left' : 'center',
      }}
      startIcon={
        iconName ? (
          <RSIcon
            iconName={iconName}
            sx={{
              height: '2em',
              width: '2em',
              mr: 0.5,
            }}
          />
        ) : undefined
      }
      {...props}
    >
      {children || (
        <Stack>
          <Typography component="div" variant="body1">
            {title}
          </Typography>
          {subtitle && (
            <Typography component="div" variant="caption">
              {subtitle}
            </Typography>
          )}
          {children}
        </Stack>
      )}
    </Button>
  )
}

const InternalButton: React.FC<RSLinkButtonProps> = ({ to, children, ...props }) => {
  const CustomLinkStub = (props, ref) => <GatsbyLink to={to} {...props} ref={ref} />
  const Component = React.forwardRef(CustomLinkStub)

  return (
    <FinalButton component={Component} {...props}>
      {children}
    </FinalButton>
  )
}

export default RSLinkButton

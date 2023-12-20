/**
 * This is a TEMPLATE Component. DO NOT USE IT OR LINK IT UP
 */

import React from 'react'
import { Box } from '@mui/material'

interface TEMPLATEProps extends React.PropsWithChildren {
  propA?: string
  propB?: React.ReactNode | React.ReactNode[]
}

export const TEMPLATE: React.FC<TEMPLATEProps> = ({ propA, propB, children, ...props }) => {
  // Logic or hooks here

  return <Box>{children}</Box>
}

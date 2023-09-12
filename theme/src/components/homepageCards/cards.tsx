/**
 * HomepageCard component
 */

import React from 'react'
import { Box, Grid, SxProps, useTheme } from '@mui/material'
import bgImage from '../../images/background-homepagecard-content.jpg'

/**
 * HomepageCard component
 * @param param0
 * @returns
 */
const HomepageCard: React.FC<React.PropsWithChildren> = ({ children }) => {
  const theme = useTheme()
  return (
    <Box
      sx={{
        display: 'grid',
        alignItems: 'center',
        gridAutoColumns: 'minmax(0, 1fr)',
        gridAutoFlow: 'row',
        mt: 8,

        '& ul': {
          listStyle: 'none' /* Remove default bullets */,
          pl: 0,
        },
        '& li::before': {
          content: '"\\2022"' /* Add content: \2022 is the CSS Code/unicode for a bullet */,
          color: theme.palette.background.default /* Change the color */,
          fontWeight: 'bold' /* If you want it to be bold */,
          display: 'inline-block' /* Needed to add space between the bullet and the text */,
          width: '1em' /* Also needed for space (tweak if needed) */,
          ml: 0 /* Also needed for space (tweak if needed) */,
        },
        [theme.breakpoints.up('md')]: {
          maxWidth: '1920px',
          ml: 'auto',
          mr: 'auto',
        },
      }}
    >
      {children}
    </Box>
  )
}

/**
 * HomepageCardContent component
 * @param param0
 * @returns
 */
interface HomepageCardProps {
  background: 'blue' | 'white'
  children: React.ReactNode
}
export const HomepageCardContent: React.FC<HomepageCardProps> = ({ children, background }) => {
  const theme = useTheme()
  return (
    <Box
      sx={{
        gridColumn: '1 / span 7',
        gridRow: 1,
        pt: 12,
        pr: 22,
        pb: 12,
        paddingLeft: 'clamp(1rem, 25vw - 20.5rem, 12.5rem)',
        color: background === 'blue' ? 'white' : undefined,
        '& :nth-of-type(1)': {
          marginTop: 0,
        },
        '& *': {
          color: background === 'blue' ? 'white' : undefined,
        },
        '& a': {
          color: '#eeeeee',
          textDecoration: 'underline',
        },
        fontSize: theme.typography.pxToRem(16),
        backgroundColor: background === 'blue' ? 'black' : undefined,
        backgroundImage: background === 'blue' ? `url(${bgImage})` : undefined,
        backgroundSize: 'cover',
      }}
    >
      {children}
    </Box>
  )
}

/**
 * HomepageCardHighlight component
 * @param param0
 * @returns
 */
interface HomepageCardHighlightProps {
  type?: 'image' | 'text'
  stats?: HomepageCardStatProps[]
  align?: 'left' | 'center' | 'right'
  columns?: 1 | 2 | 3
  children?: React.ReactNode
}
export const HomepageCardHighlight: React.FC<HomepageCardHighlightProps> = ({
  children = [],
  type = 'text',
  align = 'left',
  columns = 1,
  stats,
}) => {
  const theme = useTheme()
  const gridSize = 12 / columns
  const typeStyles: SxProps =
    type === 'image'
      ? {
          backgroundSize: 'cover',
          '& img': {
            display: 'block',
          },
        }
      : {
          background: theme.palette.secondary.main,
          color: 'white',
        }

  return (
    <Grid
      container
      px={5}
      py={8}
      sx={{
        width: '100%',
        gridColumn: '7 / span 6',
        gridRow: 1,
        ...typeStyles,
      }}
    >
      {stats?.map((stat, key) => (
        <HomepageCardStat key={key} {...stat} align={align} gridSize={gridSize} />
      ))}
      {children}
    </Grid>
  )
}

/**
 * HomepageCardStat component
 * @param param0
 * @returns
 */
interface HomepageCardStatProps {
  value: string
  label: string
  align?: 'left' | 'center' | 'right'
  gridSize?: number
}
export const HomepageCardStat: React.FC<HomepageCardStatProps> = ({ value, label, align = 'left', gridSize = 12 }) => {
  return (
    <Grid item xs={12} md={gridSize || 12} textAlign={align}>
      <Box component="div" fontFamily={'Karla'} color="inherit" fontSize={55}>
        {value}
      </Box>
      <Box fontWeight={'bold'} fontSize={20}>
        {label}
      </Box>
    </Grid>
  )
}

export default HomepageCard

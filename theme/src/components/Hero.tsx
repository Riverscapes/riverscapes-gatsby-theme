/**
 * Hero component
 */

import React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import { SxProps, Theme, useTheme } from '@mui/material'

interface HeroProps {
  children: React.ReactNode
  image: string
}

const CONSTANTS = {
  widthContent: '47.5rem' /* 760px - Half of --maxWidth-content: */,
  maxWidthContent: '71.25rem' /* 1140px - 9 of 12 columns of 1520px (1520 * 0.75) */,
  positionIndent: '3.125rem;' /* 50px */,
}

const stylesThunk = (theme: Theme): Record<string, SxProps<Theme>> => ({
  hero: {
    position: 'relative',
    overflow: 'visible !important',
    marginBottom: {
      lg: '15vw',
      xl: `calc(${theme.spacing(3)} + ${theme.typography.pxToRem(50)})`,
    },
  },
  content: {
    background: theme.palette.background.default,
    boxShadow: theme.shadows[4],
    zIndex: 10,
    '&>:nth-of-type(1)': {
      marginTop: 0,
    },
    '& > p': {
      fontSize: theme.typography.pxToRem(20),
    },
    [theme.breakpoints.up('md')]: {
      position: 'absolute',
      bottom: '-15vw',
      left: 0,
      marginLeft: '2vw',
      width: '88vw',
      maxWidth: CONSTANTS.maxWidthContent,
      background: theme.palette.background.default,
      padding: theme.spacing(2),
    },
    [theme.breakpoints.up('lg')]: {
      marginLeft: '2vw',
      width: '88vw',
      bottom: `calc(${theme.typography.pxToRem(50)} * -1)`,
      maxWidth: CONSTANTS.maxWidthContent,
      background: theme.palette.background.default,
      padding: theme.spacing(6),
    },
    [theme.breakpoints.up('xl')]: {
      left: '50%',
      maxWidth: CONSTANTS.maxWidthContent,
      marginLeft: `calc(${theme.typography.pxToRem(-760)} / 2)`,
    },
  },
})

const Hero: React.FC<HeroProps> = ({ children, image }) => {
  const theme = useTheme()
  const styles = stylesThunk(theme)

  return (
    // <Card className={`${HeroStyles.hero}`} sx={styles.hero}>
    <Card sx={styles.hero}>
      <CardMedia component="img" image={image} />
      <CardContent sx={styles.content}>{children}</CardContent>
    </Card>
  )
}

export default Hero

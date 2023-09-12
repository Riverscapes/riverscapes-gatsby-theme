/**
 * Custom MUI theme for Riverscapes website
 */
import { createTheme } from '@mui/material'

declare module '@mui/material/styles' {
  interface TypographyVariants {
    p: React.CSSProperties
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    p?: React.CSSProperties
  }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    p: true
  }
}

// MUI theme
// Intermediate theme sets all the breakpoints
const defaultTheme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1520,
    },
  },
  palette: {
    primary: {
      main: '#003B80', // --color-blue
    },
    secondary: {
      main: '#4DCBDC', // --color-neon
    },
    info: {
      main: '#1565c0', // --color-light blue
    },
    text: {
      primary: '#000', // --color-black
      secondary: '#606060', // --color-white
    },
    background: {
      default: '#f0f0f0', // --color-background-primary
    },
  },
  shape: {
    borderRadius: 2, // --border-radius-button
  },
})

// Just some helpful constants we use

export const theme = createTheme({
  breakpoints: defaultTheme.breakpoints,
  palette: defaultTheme.palette,
  typography: {
    fontFamily: '"Karla", "Arial", sans-serif',
    fontSize: 16,
    subtitle1: {
      fontSize: '1.25rem',
    },
    h1: {
      color: defaultTheme.palette.info.main,
      fontFamily: '"JetBrains Mono", "Courier New", sans-serif',
      fontSize: '3rem',
      position: 'relative',
      '&:after': {
        content: '""',
        background: '#BBCD3f',
        position: 'absolute',
        bottom: '-1rem',
        height: '0.3125rem',
        width: '6.25rem',
        left: 0,
      },
    },
    h2: {
      color: defaultTheme.palette.info.main,
      fontWeight: 400,
      fontFamily: '"JetBrains Mono", "Courier New", sans-serif',
      fontSize: '2.5rem',
      position: 'relative',
      '&:after': {
        content: '""',
        background: '#BBCD3f',
        position: 'absolute',
        bottom: '-1rem',
        height: '0.3125rem',
        width: '6.25rem',
        left: 0,
      },
    },
    h3: {
      color: defaultTheme.palette.info.main,
      fontFamily: '"JetBrains Mono", "Courier New", sans-serif',
      fontSize: '1.875rem',
    },
    h4: {
      color: defaultTheme.palette.info.main,
      fontFamily: '"JetBrains Mono", "Courier New", sans-serif',
      fontSize: '1.375rem',
    },
    h5: {
      color: defaultTheme.palette.info.main,
      fontFamily: '"JetBrains Mono", "Courier New", sans-serif',
      fontSize: '1.25rem',
    },
    h6: {
      color: defaultTheme.palette.info.main,
      fontFamily: '"JetBrains Mono", "Courier New", sans-serif',
      fontSize: '1rem',
    },

    body1: {
      fontSize: '1rem',
      [defaultTheme.breakpoints.up('lg')]: {
        fontSize: '1.375rem',
      },
    },
    body2: {
      fontSize: '1rem',
      [defaultTheme.breakpoints.up('lg')]: {
        fontSize: '1.375rem',
      },
    },
    p: {
      fontSize: '1rem',
      [defaultTheme.breakpoints.up('lg')]: {
        fontSize: '1.375rem',
      },
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {},
        a: {
          textDecoration: 'none',
          color: 'inherit',
          '&:hover': {
            textDecoration: 'underline',
          },
        },
        // body: {
        //   p: 0,
        //   m: 0,
        // },
        // a: {
        //   textDecoration: 'none',
        //   '&:hover': {
        //     textDecoration: 'underline',
        //   },
        //   '&:visited': {
        //     textDecoration: 'none',
        //   },
        // },
      },
    },
    // Name of the component
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          textTransform: 'none',
          fontSize: '1rem',
          [defaultTheme.breakpoints.up('lg')]: {
            fontSize: '1.375rem',
          },
        },
      },
      variants: [
        {
          props: { variant: 'contained' },
          style: {
            borderRadius: '2rem',
            padding: '1rem 1.5rem',
          },
        },
      ],
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          fontSize: '1.875rem',
          color: '#0661C1',
          fontFamily: 'JetBrains Mono',
          marginTop: '4rem',
          '&::before, &::after': {
            borderColor: '#B4CE00',
          },
        },
      },
    },
  },
})

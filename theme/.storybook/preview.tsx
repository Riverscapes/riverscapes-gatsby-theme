
import React from 'react'
import { ThemeProvider } from '@mui/system'
import type { Preview } from '@storybook/react'
import Layout from '../src/components/LayoutStorybook'

const preview: Preview = {
  decorators: [
    (Story) => (
      <Layout>
        <Story />
      </Layout>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview

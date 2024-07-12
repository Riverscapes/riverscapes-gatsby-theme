import type { Meta, StoryObj } from '@storybook/react'
import { faker } from '@faker-js/faker'
import _ from 'lodash'

import { ToolList } from './ToolList'
import { Tool } from './types'

const PURPOSE = ['Analysis', 'Data Management', 'Data Visualization', 'Modeling', 'Simulation']
const COMPLIANCE = ['Concept', 'Proof of Concept', 'Research Grade', 'Operational']
const INTERFACE = ['ArcGIS', 'QGIS', 'Web', 'GUI', 'CLI']
const RESOLUTIONS = ['Cell', 'Point', 'Reach']

// A tool generator function that returns a list of random tools.
const generateTools = (count: number): Array<Tool> => {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    name: faker.lorem.words(),
    description: faker.lorem.sentence(),
    // Choose between 1 and 3 random values for each filter.
    compliance: _.sampleSize(COMPLIANCE, _.random(1, 3)),
    interface: _.sampleSize(INTERFACE, _.random(1, 3)),
    purpose: _.sampleSize(PURPOSE, _.random(1, 3)),
    resolution: _.sampleSize(RESOLUTIONS, _.random(1, 3)),
  }))
}

const meta = {
  title: 'Example/ToolList',
  component: ToolList,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  args: {
    initialFilters: {
      compliance: [],
      interface: [],
      purpose: [],
      resolution: [],
    },
    tools: generateTools(40),
  },
} satisfies Meta<typeof ToolList>

export default meta
type Story = StoryObj<typeof meta>

export const ToolListStory: Story = {}

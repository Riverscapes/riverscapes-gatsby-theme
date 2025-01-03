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
  return Array.from(
    { length: count },
    () =>
      ({
        id: faker.string.uuid(),
        // TITLECASE: (s.split(" ").map((el) => {return el.charAt(0).toUpperCase() + el.slice(1)})).join(" ")
        name: faker.lorem
          .words()
          .split(' ')
          .map((el) => el.charAt(0).toUpperCase() + el.slice(1))
          .join(' '),
        description: faker.lorem.sentence(),
        toolId: faker.string.uuid(),
        grade: ['Grade'],
        url: faker.internet.url(),
        extent: [],
        // Choose between 1 and 3 random values for each filter.
        compliance: _.sampleSize(COMPLIANCE, _.random(1, 3)),
        interface: _.sampleSize(INTERFACE, _.random(1, 3)),
        purpose: _.sampleSize(PURPOSE, _.random(1, 3)),
        resolution: _.sampleSize(RESOLUTIONS, _.random(1, 3)),
      } as Tool)
  )
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
    customFilterOptions: {
      compliance: COMPLIANCE,
      extent: [],
      grade: [],
      interface: INTERFACE,
      resolution: RESOLUTIONS,
    },
    initialFilters: {
      extent: [],
      grade: [],
      compliance: [],
      interface: [],
      resolution: [],
    },
    tools: generateTools(40),
  },
} satisfies Meta<typeof ToolList>

export default meta
type Story = StoryObj<typeof meta>

export const ToolListStory: Story = {}

export const CustomStory: Story = {
  args: {
    customFilterOptions: {
      compliance: COMPLIANCE,
      extent: [],
      grade: [],
      interface: INTERFACE,
      resolution: RESOLUTIONS,
    },
    initialFilters: {
      extent: [],
      grade: [],
      compliance: [],
      interface: [],
      resolution: [],
    },
    tools: [
      {
        toolId: 'toola',
        name: 'Tool A',
        description: 'This is Tool A',
        extent: ['Extent A'],
        grade: ['Grade A'],
        url: 'https://example.com',
        compliance: ['Compliance A'],
        interface: ['Interface A'],
        resolution: ['Resolution A'],
      },
      {
        toolId: 'toolb',
        name: 'Tool B',
        description: 'This is Tool B',
        extent: ['Extent A'],
        grade: ['Grade A'],
        url: 'https://example.com',
        compliance: ['Compliance A'],
        interface: ['Interface A', 'Interface B'],
        resolution: ['Resolution A', 'Resolution B'],
      },
      {
        toolId: 'toolc',
        name: 'Tool C',
        description: 'This is Tool C',
        extent: ['Extent A'],
        grade: ['Grade A'],
        url: 'https://example.com',
        compliance: ['Compliance C'],
        interface: ['Interface C'],
        resolution: ['Resolution C'],
      },
      {
        toolId: 'toold',
        name: 'Tool D',
        description: 'This is Tool D',
        extent: ['Extent A'],
        grade: ['Grade A'],
        url: 'https://example.com',
        compliance: ['Compliance A'],
        interface: ['Interface A', 'Interface B', 'Interface D'],
        resolution: ['Resolution A', 'Resolution B', 'Resolution D'],
      },
      {
        toolId: 'toole',
        name: 'Tool E',
        description: 'This is Tool E',
        extent: ['Extent A'],
        grade: ['Grade A'],
        url: 'https://example.com',
        compliance: ['Compliance C'],
        interface: ['Interface C', 'Interface E'],
        resolution: ['Resolution C', 'Resolution E'],
      },
    ],
  },
}

export type ToolListFilterValues = {
  grade: string[]
  compliance: string[]
  interface: string[]
  extent: string[]
  resolution: string[]
}

export type Tool = {
  toolId: string
  name: string
  description: string
  url: string
} & ToolListFilterValues

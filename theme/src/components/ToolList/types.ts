export type ToolListFilterValues = {
  purpose: string[]
  compliance: string[]
  interface: string[]
  resolution: string[]
}

export type Tool = {
  toolId: string
  name: string
  description: string
  url: string
} & ToolListFilterValues

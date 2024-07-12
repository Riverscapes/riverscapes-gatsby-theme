export type ToolListFilterValues = {
  purpose: string[]
  compliance: string[]
  interface: string[]
  resolution: string[]
}

export type Tool = {
  id: string
  name: string
  description: string
} & ToolListFilterValues

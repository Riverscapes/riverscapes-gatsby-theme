import React from 'react'

export type ParamsContextType = {
  noFrame: boolean
}

export const ParamsContext = React.createContext<ParamsContextType>({
  noFrame: false,
})

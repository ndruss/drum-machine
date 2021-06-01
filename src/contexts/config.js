import React, { createContext, useContext, useReducer } from 'react'

const ConfigContext = createContext()

const initialState = {
  volume: 9,
  tempo: 66
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_VOLUME':
      return {
        ...state,
        volume: action.volume
      }
    case 'SET_TEMPO':
      return {
        ...state,
        tempo: action.tempo
      }
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

export const ConfigProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <ConfigContext.Provider value={{ state, dispatch }}>
      {children}
    </ConfigContext.Provider>
  )
}

export const useConfig = () => useContext(ConfigContext)

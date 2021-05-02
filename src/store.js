import React, { createContext, useContext, useReducer } from 'react'

const StoreContext = createContext()

const initialState = {
  measures: 4,
  subdivisions: 4,
  tempo: 100,
  tracks: [
    { name: 'Kick' }, //
    { name: 'Snare' },
  ],
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_TEMPO':
      return {
        ...state,
        tempo: action.tempo,
      }
    case 'INIT_SEQUENCE':
      return {
        ...state,
        tracks: state.tracks.map(track => {
          return {
            ...track,
            sequence: Array(state.measures * state.subdivisions),
          }
        }),
      }
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  )
}

export const useStore = () => useContext(StoreContext)

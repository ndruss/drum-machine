import React, { createContext, useContext, useReducer } from 'react'
import instruments from './constants/instruments'

const StoreContext = createContext()

const initialState = {
  measures: 4,
  subdivisions: 4,
  tempo: 100,
  tracks: [
    { name: 'Kick', instrument: instruments.kick }, //
    { name: 'Snare', instrument: instruments.snare },
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
        tracks: state.tracks.map(track => ({
          ...track,
          sequence: Array(state.measures).fill(
            Array(state.subdivisions).fill(null)
          ),
        })),
      }
    case 'TOGGLE_NOTE':
      return {
        ...state,
        tracks: state.tracks.map(track => {
          if (track.name === action.trackName) {
            return {
              ...track,
              sequence: track.sequence.map((note, index) => ({
                ...note,
                isActive: index === action.index ? action.value : note.isActive,
              })),
            }
          }
          return track
        }),
      }
    case 'PLAY_NOTE':
      return {
        ...state,
        tracks: state.tracks.map(track => {
          if (track.name === action.trackName) {
            return {
              ...track,
              sequence: track.sequence.map((note, index) => ({
                ...note,
                isPlaying: index === action.index,
              })),
            }
          }
          return track
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
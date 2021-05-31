import React, { createContext, useContext, useReducer } from 'react'
import instruments from './constants/instruments'

const StoreContext = createContext()

const timeSignature = [4, 4]

const emptySequence = Array(timeSignature[0]).fill(
  Array(timeSignature[1]).fill(null)
)

const initialState = {
  timeSignature,
  measures: timeSignature[0],
  subdivisions: timeSignature[1],
  sequence: [],
  loopProgress: [null],
  volume: 9,
  tempo: 66,
  tracks: instruments.map(instrument => ({
    instrument,
    sequence: emptySequence,
  })),
  // tracks: [
  //   { instrument: kick, sequence: emptySequence },
  //   { instrument: snare, sequence: emptySequence },
  // ],
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_VOLUME':
      return {
        ...state,
        volume: action.volume,
      }
    case 'SET_TEMPO':
      return {
        ...state,
        tempo: action.tempo,
      }
    case 'UPDATE_PROGRESS':
      const { loopProgress } = action
      return {
        ...state,
        loopProgress,
      }
    case 'UPDATE_SEQUENCE':
      const { sequence } = action
      return {
        ...state,
        sequence,
      }
    case 'TOGGLE_NOTE':
      return {
        ...state,
        tracks: state.tracks.map(track => {
          if (track.instrument.name !== action.trackName) return track
          return {
            ...track,
            sequence: track.sequence.map((measure, measureIndex) => {
              if (measureIndex !== action.measure) return measure
              return measure.map((beat, beatIndex) => {
                return beatIndex === action.index ? action.value : beat
              })
            }),
          }
        }),
      }
    case 'CLEAR_ALL_NOTES':
      return {
        ...state,
        tracks: state.tracks.map(track => ({
          ...track,
          sequence: emptySequence,
        })),
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

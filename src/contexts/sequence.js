import React, { createContext, useContext, useReducer } from 'react'
import instruments from '../constants/instruments'

const SequenceContext = createContext()

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
  tracks: instruments.map(instrument => ({
    instrument,
    sequence: emptySequence,
  })),
}

const reducer = (state, action) => {
  switch (action.type) {
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

export const SequenceProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <SequenceContext.Provider value={{ state, dispatch }}>
      {children}
    </SequenceContext.Provider>
  )
}

export const useSequence = () => useContext(SequenceContext)

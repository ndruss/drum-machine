import * as Tone from 'tone'

export const updateSequence = (tracks, subdivisions) => {
  return tracks.map(({ instrument, sequence }) => {
    return new Tone.Sequence(
      (time, note) => {
        instrument.sequenceHit(note, time)
      },
      sequence,
      `${subdivisions}n`
    )
  })
}

import * as Tone from 'tone'

const instruments = {
  kick: {
    name: 'Kick',
    synth: new Tone.MembraneSynth().toDestination(),
    note: 'C1',
    playNote() {
      this.synth.triggerAttackRelease('C1', '4n')
    },
    sequenceHit(note, time) {
      this.synth.triggerAttackRelease(note, 0.1, time)
    },
  },
  snare: {
    name: 'Snare',
    synth: new Tone.NoiseSynth().toDestination(),
    note: 'C2',
    playNote() {
      this.synth.triggerAttackRelease('4n')
    },
    sequenceHit(note, time) {
      this.synth.triggerAttackRelease(0.1, time)
    },
  },
}

export default instruments

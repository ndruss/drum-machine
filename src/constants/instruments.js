import * as Tone from 'tone'

const instruments = [
  {
    name: 'Kick',
    synth: new Tone.MembraneSynth().toDestination(),
    note: 'C1',
    playNote() {
      this.synth.triggerAttackRelease(this.note, '4n')
    },
    sequenceHit(note, time) {
      this.synth.triggerAttackRelease(note, 0.1, time)
    },
  },
  {
    name: 'Hi Hat',
    synth: new Tone.NoiseSynth().toDestination(),
    note: 'C1',
    playNote() {
      this.synth.triggerAttackRelease('4n')
    },
    sequenceHit(note, time) {
      this.synth.triggerAttackRelease(0.1, time)
    },
  },
  {
    name: 'Snare',
    synth: new Tone.Sampler({
      urls: {
        A1: 'snare_1.mp3',
      },
      baseUrl: '/samples/',
    }).toDestination(),
    note: 'A1',
    playNote() {
      this.synth.triggerAttackRelease(this.note, '4n')
    },
    sequenceHit(note, time) {
      this.synth.triggerAttackRelease(0.1, time)
    },
  },
  {
    name: 'Cymbal',
    synth: new Tone.MetalSynth().toDestination(),
    note: 'A1',
    playNote() {
      this.synth.triggerAttack(this.note)
    },
    sequenceHit(note, time) {
      this.synth.triggerAttack(note, time)
    },
  },
]

export default instruments

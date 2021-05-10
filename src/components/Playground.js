import * as Tone from 'tone'

const makeNoise = () => {
  const osc = new Tone.Oscillator().toDestination()
  // repeated event every 8th note
  Tone.Transport.scheduleRepeat(time => {
    // use the callback time to schedule events
    osc.start(time).stop(time + 0.1)
  }, '8n')
  // transport must be started before it starts invoking events
  Tone.Transport.start()
}

const Playground = () => {
  return (
    <div>
      <h1>Playground</h1>
      <button onClick={makeNoise}>Play</button>
    </div>
  )
}

export default Playground

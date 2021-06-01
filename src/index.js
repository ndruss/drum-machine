import React from 'react'
import ReactDOM from 'react-dom'
import { SequenceProvider } from './contexts/sequence'
import { ControlsProvider } from './contexts/controls'
import DrumMachine from './components/DrumMachine'
// import Playground from './components/Playground'
import './styles/index.css'

const App = () => (
  <React.StrictMode>
    <ControlsProvider>
      <SequenceProvider>
        <DrumMachine />
      </SequenceProvider>
    </ControlsProvider>
  </React.StrictMode>
)

ReactDOM.render(<App />, document.getElementById('root'))

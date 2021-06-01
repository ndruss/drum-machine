import React from 'react'
import ReactDOM from 'react-dom'
import { SequenceProvider } from './contexts/sequence'
import { ConfigProvider } from './contexts/config'
import DrumMachine from './components/DrumMachine'
// import Playground from './components/Playground'
import './styles/index.css'

const App = () => (
  <React.StrictMode>
    <ConfigProvider>
      <SequenceProvider>
        <DrumMachine />
      </SequenceProvider>
    </ConfigProvider>
  </React.StrictMode>
)

ReactDOM.render(<App />, document.getElementById('root'))

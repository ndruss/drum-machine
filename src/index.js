import React from 'react'
import ReactDOM from 'react-dom'
import { StoreProvider } from './store'
import DrumMachine from './components/DrumMachine'
import './styles/index.css'

const App = () => (
  <React.StrictMode>
    <StoreProvider>
      <DrumMachine />
    </StoreProvider>
  </React.StrictMode>
)

ReactDOM.render(<App />, document.getElementById('root'))

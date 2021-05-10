import { useStore } from '../store'
import Measure from './Measure'

const Track = ({ track }) => {
  const { state } = useStore()

  return (
    <div className="track">
      <header className="track__header">{track.instrument.name}</header>
      <div className="track__sequence">
        {track.sequence &&
          [...Array(state.measures).keys()].map(measure => (
            <Measure key={measure} index={measure} track={track} />
          ))}
      </div>
    </div>
  )
}

export default Track

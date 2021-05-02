import { useStore } from '../store'
import Measure from './Measure'

const Track = ({ name }) => {
  const { state } = useStore()

  return (
    <div className="track">
      <header className="track__header">{name}</header>
      <div className="track__sequence">
        {[...Array(state.measures).keys()].map(measure => (
          <Measure key={measure} index={measure} />
        ))}
      </div>
    </div>
  )
}

export default Track

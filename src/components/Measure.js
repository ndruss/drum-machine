import { useStore } from '../store'
import Beat from './Beat'

const Measure = ({ index, track }) => {
  const { state } = useStore()

  return (
    <div className="measure" key={index}>
      {[...Array(state.subdivisions).keys()].map(beat => (
        <Beat key={beat} measure={index} index={beat} track={track} />
      ))}
    </div>
  )
}

export default Measure

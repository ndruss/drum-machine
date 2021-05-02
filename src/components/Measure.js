import { useStore } from '../store'
import Beat from './Beat'

const Measure = ({ index }) => {
  const { state } = useStore()

  return (
    <div className="measure" key={index}>
      {[...Array(state.subdivisions).keys()].map(beat => (
        <Beat key={beat} index={beat} />
      ))}
    </div>
  )
}

export default Measure

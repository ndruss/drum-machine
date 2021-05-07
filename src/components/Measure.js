import { useStore } from '../store'
import Beat from './Beat'

const Measure = ({ index, track }) => {
  const { state } = useStore()

  return (
    <div className="measure" key={index}>
      {[...Array(state.subdivisions).keys()].map(beat => (
        <Beat
          key={beat}
          measure={index}
          index={beat + index * state.subdivisions}
          track={track}
        />
      ))}
    </div>
  )
}

export default Measure

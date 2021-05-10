import { useStore } from '../store'
import Beat from './Beat'

const Measure = ({ index, track }) => {
  const {
    state: { subdivisions, loopProgress },
  } = useStore()

  return (
    <div className="measure" key={index}>
      {[...Array(subdivisions).keys()].map(beat => (
        <Beat
          key={beat}
          measure={index}
          index={beat}
          track={track}
          isPlaying={loopProgress[0] === index && loopProgress[1] === beat}
        />
      ))}
    </div>
  )
}

export default Measure

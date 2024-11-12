import { USAMap } from '@mirawision/usa-map-react'

const custom = {
    CA: {
      fill: "red"
    },
    FL: {
        fill: "blue"
    }
  }

const Map = () => {
  return (
    <div>
        <USAMap customStates={custom}/>
    </div>
  )
}

export default Map
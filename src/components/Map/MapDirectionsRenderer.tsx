import React from 'react'
import { DirectionsRenderer } from 'react-google-maps'

function MapDirectionsRenderer(props: any) {
  const { directions } = props

  return directions && <DirectionsRenderer directions={directions} />
}

export default MapDirectionsRenderer

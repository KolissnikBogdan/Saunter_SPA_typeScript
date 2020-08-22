import React, { useEffect, useState } from 'react'
import {
  withGoogleMap,
  GoogleMap,
  withScriptjs,
  Marker,
} from 'react-google-maps'
import { compose, withProps } from 'recompose'

import MapDirectionsRenderer from './MapDirectionsRenderer'

import { IMap } from '../../models/map'

const Map = compose<IMap, IMap>(
  withProps({
    googleMapURL:
      'https://maps.googleapis.com/maps/api/js?key=' +
      process.env.REACT_APP_GOOGLE_MAP_APP_ID +
      '&libraries=geometry,drawing,places',
    loadingElement: <div style={{ height: `100%` }} />,
    mapElement: <div style={{ height: `100%` }} />,
    defaultCenter: { lat: 49.453115, lng: 32.045652 },
    defaultZoom: 14,
  }),
  withScriptjs,
  withGoogleMap
)(({
    defaultCenter,
    defaultZoom,
    onLengthChange,
    onMapChange,
    onlyView,
    route,
  }) => {
    const [
      directions,
      setDirections,
    ] = useState<google.maps.DirectionsResult | null>(null)
    const [state, setState] = useState({
      markers: Array<{ lat: any; lng: any }>(),
    })

    const mapClicked = (
      event: google.maps.MouseEvent | google.maps.IconMouseEvent
    ) => {
      const newMarker = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      }

      const { markers } = state
      markers.push(newMarker)

      if (markers.length > 1) {
        distance(markers)
      }
      setState({ markers: markers })
      if (onMapChange) {
        onMapChange(markers)
      }
    }

    const distance = (markerArr: any) => {
      const waypoints = markerArr.map((p: any) => ({
        location: { lat: p.lat, lng: p.lng },
        stopover: true,
      }))

      const origin = waypoints.shift().location
      const destination = waypoints.pop().location

      const directionsService = new google.maps.DirectionsService()
      directionsService.route(
        {
          origin: origin,
          destination: destination,
          travelMode: google.maps.TravelMode.DRIVING,
          waypoints: waypoints,
          optimizeWaypoints: true,
        },
        (result: google.maps.DirectionsResult, status: string) => {
          if (status === google.maps.DirectionsStatus.OK) {
            setDirections(result)
            if (onLengthChange) {
              onLengthChange(result)
            }
          } else {
            console.error(`error fetching directions ${result} ${status}`)
          }
        }
      )
    }

    let markers: any = null

    if (onlyView) {
      markers = route
    } else {
      markers = state.markers
    }

    useEffect(() => {
      if (markers.length > 1) {
        distance(markers)
      }
    }, [markers])

    return (
      <GoogleMap
        defaultCenter={defaultCenter}
        defaultZoom={defaultZoom}
        onClick={!onlyView ? mapClicked : () => {}}
      >
        {markers &&
          markers.map((el: any) => (
            <Marker key={el.lat + el.lng} position={el} />
          ))}
        {markers && markers.length > 1 ? (
          <MapDirectionsRenderer directions={directions} />
        ) : null}
      </GoogleMap>
    )
  }
)

export default Map

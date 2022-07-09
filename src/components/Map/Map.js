import React, { useRef, useEffect } from 'react'
import mapboxgl from 'mapbox-gl'

import './Map.scss'

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN

const Map = ({ center, zoom }) => {
  const mapContainerRef = useRef()

  // Initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center,
      zoom
    })

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), 'top-right')

    // Add a default marker
    new mapboxgl.Marker().setLngLat(center).addTo(map)

    // Clean up on unmount
    return () => map.remove()
  }, [center, zoom])

  return <div className="map-container" ref={mapContainerRef} />
}

export default Map

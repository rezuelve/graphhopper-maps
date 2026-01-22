import { Feature, Map } from 'ol'
import { Marker } from '@/stores/MarkersStore'
import React, { useEffect } from 'react'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import { Point } from 'ol/geom'
import { fromLonLat } from 'ol/proj'
import { Icon, Style, Text, Fill, Stroke } from 'ol/style'
import pinIcon from '@/assets/pin.png'

const MARKER_SIZE = 60 // Size for the custom pin icon

export default function useMarkersLayer(map: Map, markers: Marker[]) {
    useEffect(() => {
        removeMarkers(map)
        if (markers.length > 0) {
            addMarkersLayer(map, markers)
        }
    }, [map, markers])
}

function removeMarkers(map: Map) {
    map.getLayers()
        .getArray()
        .filter(l => l.get('gh:markers'))
        .forEach(l => map.removeLayer(l))
}

function addMarkersLayer(map: Map, markers: Marker[]) {
    const features = markers.map((marker) => {
        const feature = new Feature({
            geometry: new Point(fromLonLat([marker.coordinate.lng, marker.coordinate.lat])),
        })
        feature.set('gh:marker', marker)
        return feature
    })

    const markersLayer = new VectorLayer({
        source: new VectorSource({
            features: features,
        }),
    })
    markersLayer.set('gh:markers', true)
    markersLayer.setZIndex(2) // Below query points (zIndex 3) but above paths
    markersLayer.setStyle(
        (feature) => {
            const marker = feature.get('gh:marker') as Marker
            return new Style({
                image: new Icon({
                    src: pinIcon,
                    scale: MARKER_SIZE / 64, // Scale the icon (assuming original is ~64px)
                    anchor: [0.5, 1], // Anchor at bottom center of the pin
                    anchorXUnits: 'fraction',
                    anchorYUnits: 'fraction',
                }),
                text: marker.label ? new Text({
                    text: marker.label,
                    offsetY: -MARKER_SIZE/2 - 10, // Position above the marker
                    font: 'bold 14px sans-serif',
                    fill: new Fill({ color: '#000' }),
                    stroke: new Stroke({ color: '#fff', width: 3 }),
                    textAlign: 'center',
                    textBaseline: 'bottom',
                }) : undefined,
            })
        }
    )
    map.addLayer(markersLayer)
}


import React, { useState } from 'react'
import { Layer, Popup, Source } from 'react-map-gl'
import { MapLayer } from '@/layers/MapLayer'
import config from 'config'

export default function (enabled: boolean, firstSymbolLayerId: string | undefined): MapLayer {
    const [currRoad, setCurrRoad] = useState<any>(null)
    return {
        interactiveLayerIds: enabled ? ['gh-graph'] : [],
        onClick: () => {},
        onHover: feature => {
            setCurrRoad(feature)
        },
        layer: (
            <>
                {currRoad && enabled && (
                    <Popup longitude={currRoad.lngLat[0]} latitude={currRoad.lngLat[1]} closeButton={false}>
                        <pre>{JSON.stringify(currRoad.feature.properties, null, 2)}</pre>
                    </Popup>
                )}
                {enabled && (
                    <Source
                        type={'vector'}
                        tiles={[
                            `${config.api}mvt/{z}/{x}/{y}.mvt?details=road_class,surface,road_environment,max_speed,average_speed`,
                        ]}
                    >
                        <Layer
                            id="gh-graph"
                            type="line"
                            source-layer="roads"
                            paint={{
                                'line-color': [
                                    'match',
                                    ['get', 'road_class'],
                                    'motorway',
                                    'red',
                                    'primary',
                                    'orange',
                                    'trunk',
                                    'orange',
                                    'secondary',
                                    'yellow',
                                    /*other*/ 'grey',
                                ],
                                'line-width': 3,
                            }}
                            layout={{
                                'line-join': 'round',
                                'line-cap': 'round',
                            }}
                            beforeId={firstSymbolLayerId}
                        />
                    </Source>
                )}
            </>
        ),
    }
}

declare module '*.css'
declare module '*.svg'
declare module '*.png'
declare module 'leaflet.heightgraph/src/heightgraph'

declare module 'config' {
    const api: string
    const defaultTiles: string
    const keys = {
        graphhopper: string,
        omniscale: string,
        maptiler: string,
        thunderforest: string,
        kurviger: string,
    }
    const extraProfiles: object
}
declare module 'react-responsive' {
    function useMediaQuery(props: { query: string }): boolean
}

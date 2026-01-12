import Store from '@/stores/Store'
import { Action } from '@/stores/Dispatcher'
import { SetMarkers } from '@/actions/Actions'
import { Coordinate } from '@/stores/QueryStore'

export interface Marker {
    readonly coordinate: Coordinate
    readonly id: number
}

export interface MarkersStoreState {
    readonly markers: Marker[]
}

export default class MarkersStore extends Store<MarkersStoreState> {
    constructor() {
        super()
    }

    protected getInitialState(): MarkersStoreState {
        return {
            markers: [],
        }
    }

    reduce(state: MarkersStoreState, action: Action): MarkersStoreState {
        if (action instanceof SetMarkers) {
            const markers = action.coordinates.map((coord, index) => ({
                coordinate: coord,
                id: index,
            }))
            return {
                ...state,
                markers,
            }
        }
        return state
    }
}



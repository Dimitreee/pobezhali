import { load } from '@2gis/mapgl'
import * as mapgl from '@2gis/mapgl/types'
import { Map as MapInterface } from '@2gis/mapgl/types/map'

export type Position = number[]
export type Path = number[][]

export class MapController {
    public glApi:typeof mapgl = null
    public mapInstance:MapInterface = null

    constructor(private containerId: string) {
    }

    public init() {
        return load().then((mapglAPI) => {
            this.glApi = mapglAPI

            this.mapInstance = new mapglAPI.Map(this.containerId, {
                zoomControl: false,
                zoom: this.defaultZoom,
                key: process.env.REACT_APP_MAPS_ACCESS_TOKEN
            });

            return this.mapInstance
        });
    }

    public destroy() {
        if (!this.mapInstance) {
            return
        }

        this.mapInstance.destroy()
        this.mapInstance = null
        this.glApi = null
    }

    public drawPolyline(path: Path) {
        if (!this.mapInstance || this.glApi) {
            return
        }

        return new this.glApi.Polyline(this.mapInstance, {
            coordinates: path,
            ...this.polylineConfig
        });
    }

    public drawStartPosition(position: Position) {
        return this.drawCircleMarker(position, this.startMarkerConfig)
    }

    public drawEndPosition(position: Position) {
        return this.drawCircleMarker(position, this.endMarkerConfig)
    }

    private drawCircleMarker(position: Position, config) {
        if (!this.glApi || !this.mapInstance) {
            return
        }

        return new this.glApi.CircleMarker(this.mapInstance, {
            coordinates: position,
            ...config
        })
    }

    private startMarkerConfig = {
        radius: 14,
        color: "#d02525",
        strokeWidth: 4,
        strokeColor: '#ffffff',
        stroke2Width: 6,
        stroke2Color: '#0088ff55',
        zIndex:20,
    }

    private endMarkerConfig = {
        radius: 14,
        color: "#d02525",
        strokeWidth: 4,
        strokeColor: '#ffffff',
        stroke2Width: 6,
        stroke2Color: '#0088ff55',
        zIndex:20,
    }

    private polylineConfig = {
        color: "#d02525",
        width: 10,
        zIndex: 200,
    }

    private defaultZoom = 16
}
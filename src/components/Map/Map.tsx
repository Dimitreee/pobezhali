import { load } from '@2gis/mapgl';
import * as mapgl from '@2gis/mapgl/types'
import { Map as MapInterface } from '@2gis/mapgl/types'
import { useEffect, useState, createContext, memo, Dispatch, useContext } from 'react'
import { useGeoTracker } from '../../hooks/useGeoTracker'

const MapWrapper = memo(
    () => {
        return <div id="map-container" style={{ width: '100%', height: '100%' }}></div>;
    },
    () => true,
);

interface IMapContext {
    mapInstance?: MapInterface,
    setMapInstance?: Dispatch<MapInterface>
    glApi?: typeof mapgl
    setGlApi?: Dispatch<typeof mapgl>
}

export const MapContext = createContext<IMapContext>({});

export const MapProvider = (props) => {
    const [mapInstance, setMapInstance] = useState<MapInterface | null>(null);
    const [glApi, setGlApi] = useState<typeof mapgl | null>(null);

    return (
        <MapContext.Provider value={{ mapInstance, setMapInstance, glApi, setGlApi }}>
            {props.children}
        </MapContext.Provider>
    );
};

export const Map = () => {
    const { setMapInstance, setGlApi } = useContext(MapContext);
    const { getCurrentPosition } = useGeoTracker()

    useEffect(() => {
        let map;

        load().then((mapglAPI) => {
            setGlApi(mapglAPI)

            getCurrentPosition().then(({ coords }) => {
                const positon = [coords.longitude, coords.latitude]

                map = new mapglAPI.Map('map-container', {
                    zoomControl: false,
                    center: positon,
                    zoom: 16,
                    key: 'bfd8bbca-8abf-11ea-b033-5fa57aae2de7',
                });

                setMapInstance(map)
            })

        });

        return () => {
            map && map.destroy();
        };
    }, []);

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <MapWrapper />
        </div>
    )
};
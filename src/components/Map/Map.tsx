import { useEffect, useState, createContext, memo, Dispatch, useContext } from 'react'
import { MapController } from './MapController'

const MapWrapper = memo(
    () => {
        return <div id="map-container" style={{ width: '100%', height: '100%' }}></div>;
    },
    () => true,
);

interface IMapContext {
    mapController?: MapController,
    setMapController?: Dispatch<MapController | null>
}

export const MapContext = createContext<IMapContext>({});

export const MapProvider = (props) => {
    const [mapController, setMapController] = useState<MapController| null>(null);

    return (
        <MapContext.Provider value={{ mapController, setMapController }}>
            {props.children}
        </MapContext.Provider>
    );
};

export const Map = () => {
    const { setMapController, mapController } = useContext(MapContext);

    useEffect(() => {
        const controller = new MapController('map-container')
        controller.init().then(() => {
            setMapController(controller)
        })

        return () => {
            if (mapController) {
                mapController.destroy()
            }
        };
    }, []);

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <MapWrapper />
        </div>
    )
};
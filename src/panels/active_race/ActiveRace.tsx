import { useRouter } from '@happysanta/router'
import { Icon48Pause, Icon48Play } from '@vkontakte/icons'
import React, { useContext, useEffect, useRef } from 'react'
import { Button, InfoRow, Panel, PanelHeader, PanelHeaderBack, Title } from '@vkontakte/vkui'
import { Icon24Stop } from '@vkontakte/icons';

import './ActiveRace.css'
import { useDispatch } from 'react-redux'
import { useStopwatch } from 'react-timer-hook'
import { Map, MapContext } from '../../components/Map/Map'
import { updateRacePath, updateDistance, updateDuration } from '../../features/acitveRace/activeRacesSlice'
import {
    ModalContext,
    MODAL_CARD_END_RACE
} from '../../components/Modal/ModalContext'
import { useAppSelector } from '../../features/store'
import { useGeoTracker } from '../../hooks/useGeoTracker'
import { formatDistance, formatNumber, getPathLength } from '../../utils/common'

interface IRunsProps {
    id: string
}

const GEO_POLL_INTERVAL = 4000
const SECONDS_PER_MINUTE = 60
const SECONDS_PER_HOUR = 3600

export const ActiveRace: React.FC<IRunsProps> = (props) =>  {
    const router = useRouter()
    const { pollCurrentPosition, isPolling, stopPolling, getCurrentPosition } = useGeoTracker()
    const { glApi, mapInstance } = useContext(MapContext)
    const { setActiveModal } = useContext(ModalContext)

    const dispatch = useDispatch()

    const activeRace = useAppSelector((state) => state.activeRace)

    const {
        seconds,
        minutes,
        hours,
        reset,
        pause: pauseTimer,
    } = useStopwatch({ autoStart: false });

    const polyline = useRef(null)
    const endMarker = useRef(null)
    const startMarker = useRef(null)

    useEffect(() => {
        if (!glApi || !mapInstance) {
            return
        }

        getCurrentPosition().then(({ coords }) => {
            const position = [coords.longitude, coords.latitude]

            startMarker.current = new glApi.CircleMarker(mapInstance, {
                coordinates: position,
                radius: 14,
                color: '#0088ff',
                strokeWidth: 4,
                strokeColor: '#ffffff',
                stroke2Width: 6,
                stroke2Color: '#0088ff55',
            });
        })

        return () => {
            if (startMarker.current !== null) {
                startMarker.current.destroy()
                startMarker.current = null
            }
        }
    }, [mapInstance, glApi])

    useEffect(() => {
        if (!activeRace.path.length) {
            return
        }

        if (!glApi || !mapInstance || !activeRace.path.length) {
            return
        }

        if (polyline.current) {
            polyline.current.destroy()
        }

        polyline.current = new glApi.Polyline(mapInstance, {
            coordinates: activeRace.path,
            color: "#d02525",
            width: 10,
            zIndex: 200,
        });

        if (endMarker.current) {
            endMarker.current.destroy()
        }

        endMarker.current = new glApi.CircleMarker(mapInstance, {
            coordinates: activeRace.path[activeRace.path.length - 1],
            radius: 14,
            color: "#d02525",
            strokeWidth: 4,
            strokeColor: '#ffffff',
            stroke2Width: 6,
            stroke2Color: '#0088ff55',
            zIndex:20,
        })

        return () => {
            if (polyline.current !== null) {
                polyline.current.destroy()
                polyline.current = null
            }

            if (endMarker.current) {
                endMarker.current.destroy()
                endMarker.current = null
            }
        }
    }, [activeRace.path])

    useEffect(() => {
        // TODO: Инкрементить дистанцию при добавлении одной точки в путь
        const distanceLength = getPathLength(activeRace.path);
        dispatch(updateDistance(distanceLength))
    }, [activeRace.path])

    useEffect(() => {
        const nextDuration = { seconds, minutes, hours }
        dispatch(updateDuration(nextDuration))
    }, [seconds, minutes, hours])

    const updatePath = (position) => {
        dispatch(updateRacePath([position.coords.longitude, position.coords.latitude]))
    }

    const stopPositionPolling = () => {
        pauseTimer()
        stopPolling()
    }

    const enablePositionPolling = () => {
        if (isPolling) {
            stopPositionPolling()
            return
        }

        const stopwatchOffset = new Date();
        stopwatchOffset.setSeconds(stopwatchOffset.getSeconds() + seconds + (minutes * SECONDS_PER_MINUTE) + (hours * SECONDS_PER_HOUR))
        reset(stopwatchOffset)

        pollCurrentPosition(updatePath, GEO_POLL_INTERVAL)
    }

    return (
        <Panel id={props.id}>
            <PanelHeader left={<PanelHeaderBack label='Назад' onClick={() => router.popPage()}/>}/>
            <div className='map_container'>
                <Map/>
            </div>
            <div className='button_container'>
                <div className='clock_container'>
                    <InfoRow header='Дистанция'>
                        <Title level='1' weight='medium'>
                            {formatDistance(activeRace.distance)} км.
                        </Title>
                    </InfoRow>
                    <InfoRow header='Время'>
                        <Title level='1' weight='medium'>
                            {formatNumber(activeRace.duration.hours)}:{formatNumber(activeRace.duration.minutes)}:{formatNumber(activeRace.duration.seconds)}
                        </Title>
                    </InfoRow>
                </div>
                <div className='controls_container'>
                    <Button
                        mode={!(activeRace.distance > 0) ? 'overlay_secondary' : 'secondary'}
                        disabled={!(activeRace.distance > 0)}
                        onClick={() => {
                            stopPositionPolling()
                            setActiveModal(MODAL_CARD_END_RACE)
                        }}
                    >
                        <Icon24Stop width={80} height={80}/>
                    </Button>
                    <Button mode='primary' size={'l'} onClick={enablePositionPolling}>
                        {
                            isPolling
                                ? <Icon48Pause width={80} height={80}/>
                                : <Icon48Play width={80} height={80} />
                        }
                    </Button>
                </div>
            </div>
        </Panel>
    )
}

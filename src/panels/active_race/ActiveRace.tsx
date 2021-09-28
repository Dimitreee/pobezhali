import { useRouter } from '@happysanta/router'
import { Icon48Pause, Icon48Play } from '@vkontakte/icons'
import React, { useCallback, useContext, useEffect, useRef } from 'react'
import { Button, InfoRow, Panel, PanelHeader, PanelHeaderBack, Title } from '@vkontakte/vkui'
import { Icon24Stop } from '@vkontakte/icons';

import './ActiveRace.css'
import { useDispatch } from 'react-redux'
import { useStopwatch } from 'react-timer-hook'
import { Map, MapContext } from '../../components/Map/Map'
import { updateRacePath, updateDistance, updateDuration, resetRace } from '../../features/acitveRace/activeRacesSlice'
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
    const { mapController } = useContext(MapContext)
    const { setActiveModal } = useContext(ModalContext)

    const dispatch = useDispatch()

    const { path, distance, duration } = useAppSelector((state) => state.activeRace)

    const {
        seconds,
        minutes,
        hours,
        reset,
        pause: pauseTimer,
    } = useStopwatch({ autoStart: false });

    useEffect(() => {
        if (!mapController) {
            return
        }

        getCurrentPosition().then((position) => {
            if (!position) {
                return
            }

            mapController.centerMap(position)
        })
    }, [mapController])

    useEffect(() => {
        if (!path.length) {
            return
        }

        dispatch(updateDistance(getPathLength(path)))

        if (!mapController) {
            return
        }

        mapController.drawPath((path))
        mapController.centerMap(path[path.length - 1])
    }, [mapController, path])

    useEffect(() => {
        dispatch(updateDuration({ seconds, minutes, hours }))
    }, [seconds, minutes, hours])

    const updatePath = useCallback((position) => {
        if (!position) {
            return
        }

        if (path.length > 1) {
            const lastPoint = path[path.length - 1]

            if (position[0] === lastPoint[0] && position[1] === lastPoint[1]) {
                return
            }
        }

        dispatch(updateRacePath(position))
    }, [path])

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

        getCurrentPosition().then((position) => {
            if (!position) {
                return
            }

            dispatch(updateRacePath(position))
            mapController.centerMap(position)

            pollCurrentPosition(updatePath, GEO_POLL_INTERVAL)
        })
    }

    return (
        <Panel id={props.id}>
            <PanelHeader left={<PanelHeaderBack label='Назад' onClick={() => {
                stopPositionPolling()
                dispatch(resetRace())
                router.popPage()
            }}/>}/>
            <div className='map_container'>
                <Map/>
            </div>
            <div className='button_container'>
                <div className='clock_container'>
                    <InfoRow header='Дистанция'>
                        <Title level='1' weight='medium'>
                            {formatDistance(distance)} км.
                        </Title>
                    </InfoRow>
                    <InfoRow header='Время'>
                        <Title level='1' weight='medium'>
                            {formatNumber(duration.hours)}:{formatNumber(duration.minutes)}:{formatNumber(duration.seconds)}
                        </Title>
                    </InfoRow>
                </div>
                <div className='controls_container'>
                    <Button
                        mode={!(distance > 0) ? 'overlay_secondary' : 'secondary'}
                        disabled={!(distance > 0)}
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

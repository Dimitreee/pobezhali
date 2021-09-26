import { useParams, useRouter } from '@happysanta/router'
import React, { useContext, useEffect, useMemo } from 'react'
import { Button, InfoRow, Panel, PanelHeader, PanelHeaderBack, Title } from '@vkontakte/vkui'
import { Icon28ShareExternalOutline } from '@vkontakte/icons'

import { Map, MapContext } from '../../components/Map/Map'
import { MODAL_CARD_SHARE_RACE, ModalContext } from '../../components/Modal/ModalContext'
import { useAppSelector } from '../../features/store'
import { formatDistance, formatDuration } from '../../utils/common'

interface IRunsProps {
    id: string
}

export const Race: React.FC<IRunsProps> = (props) =>  {
    const router = useRouter()
    const { id, action } = useParams()
    const actions = useMemo(() => action ? action.split(',') : [], [action])
    const { glApi, mapInstance } = useContext(MapContext)
    const { setActiveModal } = useContext(ModalContext)
    const races = useAppSelector((state) => state.races.races)

    const activeRace = races.find(({ id: activityId }) => activityId === id)

    useEffect(() => {
        if (actions.includes('showShareModal')) {
            requestAnimationFrame(() => {
                setActiveModal(MODAL_CARD_SHARE_RACE)
            })
        }
    })

    useEffect(() => {
        if (!glApi || !mapInstance || !activeRace.path.length) {
            return
        }

        mapInstance.setCenter(activeRace.path[0])

        const polyline = new glApi.Polyline(mapInstance, {
            coordinates: activeRace.path,
            color: "#d02525",
            width: 10,
            zIndex: 200,
        });

        const endMarker = new glApi.CircleMarker(mapInstance, {
            coordinates: activeRace.path[activeRace.path.length - 1],
            radius: 14,
            color: "#d02525",
            strokeWidth: 4,
            strokeColor: '#ffffff',
            stroke2Width: 6,
            stroke2Color: '#0088ff55',
            zIndex:20,
        })

        const startMarker = new glApi.CircleMarker(mapInstance, {
            coordinates: activeRace.path[0],
            radius: 14,
            color: '#0088ff',
            strokeWidth: 4,
            strokeColor: '#ffffff',
            stroke2Width: 6,
            stroke2Color: '#0088ff55',
        });

        return () => {
            polyline.destroy()
            endMarker.destroy()
            startMarker.destroy()
        }
    }, [activeRace, mapInstance, glApi, actions, setActiveModal])

    return (
        <Panel id={props.id}>
            <PanelHeader left={<PanelHeaderBack label="Назад" onClick={() => router.popPage()}/>}>
                Пробежка { id }
            </PanelHeader>
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
                            {formatDuration(activeRace.duration)}
                        </Title>
                    </InfoRow>
                </div>
                {
                    actions.includes('canShare') && <div className='controls_container'>
                        <Button mode='primary' size={'l'} onClick={() => setActiveModal(MODAL_CARD_SHARE_RACE)}>
                            <Icon28ShareExternalOutline width={80} height={80}/>
                        </Button>
                    </div>
                }
            </div>
        </Panel>
    )
}

import { PAGE_MAIN, useParams, useRouter } from '@happysanta/router'
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
    const { mapController } = useContext(MapContext)
    const { setActiveModal } = useContext(ModalContext)

    const races = useAppSelector((state) => state.races.races)
    const { path, distance, duration } = races.find(({ id: raceId }) => raceId === id)

    useEffect(() => {
        if (!mapController || !path.length) {
            return
        }

        requestAnimationFrame(() => {
            mapController.drawPath(path)
            mapController.centerMap(path[path.length - 1])
        })
    }, [mapController, path])

    const actions = useMemo(() => action ? action.split(',') : [], [action])

    return (
        <Panel id={props.id}>
            <PanelHeader left={<PanelHeaderBack label='Назад' onClick={() => router.pushPage(PAGE_MAIN)}/>}>
                Пробежка { id }
            </PanelHeader>
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
                            {formatDuration(duration)}
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

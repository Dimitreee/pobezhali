import { useParams, useRouter } from '@happysanta/router'
import React, { useMemo } from 'react'
import { InfoRow, Panel, PanelHeader, PanelHeaderBack, Title } from '@vkontakte/vkui'

import { Map } from '../../components/Map/Map'

interface IRunsProps {
    id: string
}

export const Race: React.FC<IRunsProps> = (props) =>  {
    const router = useRouter()
    const { id } = useParams()

    return (
        <Panel id={props.id}>
            <PanelHeader left={<PanelHeaderBack label='Назад' onClick={() => router.popPage()}/>}>
                Пробежка { id }
            </PanelHeader>
            <div className='map_container'>
                <Map/>
            </div>

            <div className='button_container'>
                <div className='clock_container'>
                    <InfoRow header='Дистанция'>
                        <Title level='1' weight='medium'>
                        </Title>
                    </InfoRow>
                    <InfoRow header='Время'>
                        <Title level='1' weight='medium'>
                        </Title>
                    </InfoRow>
                </div>
            </div>
        </Panel>
    )
}

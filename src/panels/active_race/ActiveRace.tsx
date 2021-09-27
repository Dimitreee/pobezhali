import { useRouter } from '@happysanta/router'
import React from 'react'
import { Button, Panel, PanelHeader, PanelHeaderBack } from '@vkontakte/vkui'

import './ActiveRace.css'
import { Map } from '../../components/Map/Map'
import { PAGE_RACE } from '../../routes'

interface IRunsProps {
    id: string
}

export const ActiveRace: React.FC<IRunsProps> = (props) =>  {
    const router = useRouter()

    return (
        <Panel id={props.id}>
            <PanelHeader left={<PanelHeaderBack label='Назад' onClick={() => router.popPage()}/>}/>
            <div className='map_container'>
                <Map/>
            </div>
            <div className='button_container'>
                <Button onClick={() => router.pushPage(PAGE_RACE)}>
                    Проверить баг
                </Button>
            </div>
        </Panel>
    )
}

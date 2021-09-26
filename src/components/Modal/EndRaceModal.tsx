import { Icon56Hearts2CircleFillTwilight } from '@vkontakte/icons'
import { Button, ModalCard } from '@vkontakte/vkui'
import React from 'react'
import { useDispatch } from 'react-redux'
import { resetRace } from '../../features/acitveRace/activeRacesSlice'
import { addRace } from '../../features/races/racesSlice'
import { useAppSelector } from '../../features/store'
import { PAGE_RACE, router } from '../../routes'
import { createMockRaceData } from '../../utils/common'

interface IEndRaceModal {
    id: string
    setActiveModal: (id:string) => void
    closeActiveModal: () => void
}

export const EndRaceModal: React.FC<IEndRaceModal> = (props) => {
    const dispatch = useDispatch()
    const activeRace = useAppSelector((state) => state.activeRace)
    const activeUser = useAppSelector((state) => state.userSlice.user)

    return (
        <ModalCard
            id={props.id}
            onClose={props.closeActiveModal}
            icon={<Icon56Hearts2CircleFillTwilight />}
            header='Уже закончили?'
            subheader='Хорошая тренировка!'
            actions={[
                <Button key='allow' size='l' mode='secondary' onClick={() => {
                    const race = createMockRaceData(activeRace, String(activeUser.id))
                    dispatch(addRace(race))
                    dispatch(resetRace())
                    props.closeActiveModal()

                    router.pushPage(PAGE_RACE, { id: race.id, action: 'showShareModal,canShare' })
                }}>
                    Да
                </Button>,
                <Button key='deny' size='l' mode='primary' onClick={props.closeActiveModal}>
                    Нет
                </Button>
            ]}
        />
    )
}
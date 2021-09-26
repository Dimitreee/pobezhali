import { useRouter } from '@happysanta/router'
import { Icon56CompassCircleFillPurple } from '@vkontakte/icons'
import { Button, ModalCard } from '@vkontakte/vkui'
import React, { useState } from 'react'
import { useGeoTracker } from '../../hooks/useGeoTracker'
import { PAGE_ACTIVE_RACE } from '../../routes'
import { MODAL_CARD_GEO_DENIED } from './ModalContext'

interface IEnableGeoModal {
    id: string
    setActiveModal: (id:string) => void
    closeActiveModal: () => void
}

export const EnableGeoModal: React.FC<IEnableGeoModal> = (props) => {
    const { getGeoPermissions } = useGeoTracker()
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    return (
        <ModalCard
            id={props.id}
            onClose={props.closeActiveModal}
            icon={<Icon56CompassCircleFillPurple />}
            header='Сейчас мы проверим доступность геосервисов'
            subheader='Доступ нужен для корректного отображения маршрута'
            actions={[
                <Button key='allow' size='l' mode='primary' loading={isLoading} onClick={() => {
                    setIsLoading(true)
                    getGeoPermissions(
                        () => {
                            props.closeActiveModal()
                            setIsLoading(false)
                            router.pushPage(PAGE_ACTIVE_RACE)
                        },
                        () => {
                            props.closeActiveModal()
                            props.setActiveModal(MODAL_CARD_GEO_DENIED)
                        }
                    )
                }}>
                    Хорошо
                </Button>
            ]}
        />
    )
}
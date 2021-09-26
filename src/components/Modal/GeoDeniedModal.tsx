import { useRouter } from '@happysanta/router'
import { Icon56CompassCircleFillPurple } from '@vkontakte/icons'
import { Button, ModalCard } from '@vkontakte/vkui'
import React, { useState } from 'react'
import { useGeoTracker } from '../../hooks/useGeoTracker'
import { PAGE_ACTIVE_RACE } from '../../routes'

interface IGeoDeniedModal {
    id: string
    setActiveModal: (id:string) => void
    closeActiveModal: () => void
}

export const GeoDeniedModal: React.FC<IGeoDeniedModal> = (props) => {
    const { getGeoPermissions } = useGeoTracker()
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    return (
        <ModalCard
            id={props.id}
            onClose={() => props.setActiveModal(null)}
            icon={<Icon56CompassCircleFillPurple />}
            header='Мы не смогли получить доступ'
            actions={[
                <Button key='allow' size='l' mode='secondary' onClick={props.closeActiveModal}>
                    Хорошо
                </Button>,
                <Button key='retry' size='l' mode='primary' loading={isLoading} onClick={() => {
                    getGeoPermissions(
                        () => {
                            props.setActiveModal(null)
                            setIsLoading(false)
                            router.pushPage(PAGE_ACTIVE_RACE)
                        },
                        () => props.setActiveModal(null)
                    )
                }}>
                    Попробовать еще раз
                </Button>,
            ]}
        />
    )
}

import { Icon48StarsCircleFillViolet } from '@vkontakte/icons';
import { Button, ModalCard } from '@vkontakte/vkui'
import React from 'react'

interface IEndRaceModal {
    id: string
    setActiveModal: (id:string) => void
    closeActiveModal: () => void
}

export const ShareSuccessModal: React.FC<IEndRaceModal> = (props) => {
    return (
        <ModalCard
            id={props.id}
            onClose={props.closeActiveModal}
            icon={<Icon48StarsCircleFillViolet />}
            header='Теперь ваши друзья знают о ваших успехах'
            subheader='Продолжайте в том же духе!'
            actions={[
                <Button key='allow' size='l' mode='secondary' onClick={props.closeActiveModal}>
                    Продолжить
                </Button>
            ]}
        />
    )
}
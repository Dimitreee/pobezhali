import { useParams } from '@happysanta/router'
import { Icon56Hearts2CircleFillTwilight } from '@vkontakte/icons'
import { Button, ModalCard, Headline } from '@vkontakte/vkui'
import React, { useState } from 'react'
import { useAppSelector } from '../../features/store'
import { shareRunInfo } from '../../utils/api'
import { CanvasPoster } from '../CanvasPoster/CanvasPoster'
import { MODAL_CARD_SHARE_SUCCESS } from './ModalContext'

interface IShareRaceModal {
    id: string
    setActiveModal: (id:string) => void
    closeActiveModal: () => void
}

export const ShareRaceModal: React.FC<IShareRaceModal> = (props) => {
    const [blob, setBlob] = useState(null)
    const { id } = useParams()
    const currentRace = useAppSelector((state) => state.races.races.find((race) => race.id === id))

    return (
        <ModalCard
            id={props.id}
            onClose={() => props.setActiveModal(null)}
            icon={<Icon56Hearts2CircleFillTwilight />}
            header='Рассказажите о пробежке друзьям'
            actions={[
                <Button key='allow' size='l' mode='secondary' loading={!blob} onClick={() => {
                    shareRunInfo(blob).then(() => {
                        props.setActiveModal(MODAL_CARD_SHARE_SUCCESS)
                    })
                }}>
                    Рассказать
                </Button>
            ]}
        >
            <Headline weight="regular" style={{ marginBottom: 16 }}>Ваши успехи могут мотивировать ваших близких</Headline>
            <CanvasPoster race={currentRace} onBlobGenerated={(blob) => setBlob(blob)}/>
        </ModalCard>
    )
}

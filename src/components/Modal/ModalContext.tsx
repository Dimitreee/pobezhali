import { ModalRoot } from '@vkontakte/vkui'
import React, { createContext, useState } from 'react'
import { ShareSuccessModal } from './ShareSuccessModal'
import { EnableGeoModal } from './EnableGeoModal'
import { EndRaceModal } from './EndRaceModal'
import { GeoDeniedModal } from './GeoDeniedModal'
import { ShareRaceModal  } from './ShareRaceModal'

export const MODAL_CARD_END_RACE = 'end_race'
export const MODAL_CARD_GEO_DENIED = 'geo_denied'
export const MODAL_CARD_SHARE_RACE = 'share_race'
export const MODAL_CARD_ENABLE_GEO = 'enable_geo'
export const MODAL_CARD_SHARE_SUCCESS = 'share_success'

interface IModalContext {
    modalBack?: () => void
    modalElement?: JSX.Element
    setActiveModal?: (modalId: string) => void
    closeActiveModal?: () => void
}

export const ModalContext = createContext<IModalContext>({});

export const ModalContextProvider: React.FC = (props) => {
    const [activeModalId, setActiveModalId] = useState(null)
    const [modalHistory, setModalHistory] = useState([])

    const setActiveModal = (activeModal: string = null) => {
        let history = modalHistory ? [...modalHistory] : [];

        if (activeModal === null) {
            history = [];
        } else if (modalHistory.indexOf(activeModal) !== -1) {
            history = modalHistory.splice(0, modalHistory.indexOf(activeModal) + 1);
        } else {
            history.push(activeModal);
        }

        setActiveModalId(activeModal)
        setModalHistory(history)
    }

    const modalBack = () => {
        setActiveModal(modalHistory.length > 2 ? modalHistory[modalHistory.length - 2] : null);
    };

    const closeActiveModal = () => {
        setActiveModal(null)
    }

    const modal: JSX.Element = (
        <ModalRoot
            activeModal={activeModalId}
            onClose={modalBack}
        >
            <EndRaceModal id={MODAL_CARD_END_RACE} closeActiveModal={closeActiveModal} setActiveModal={setActiveModal}/>
            <GeoDeniedModal id={MODAL_CARD_GEO_DENIED} closeActiveModal={closeActiveModal} setActiveModal={setActiveModal}/>
            <ShareRaceModal id={MODAL_CARD_SHARE_RACE} closeActiveModal={closeActiveModal} setActiveModal={setActiveModal}/>
            <EnableGeoModal id={MODAL_CARD_ENABLE_GEO} closeActiveModal={closeActiveModal} setActiveModal={setActiveModal}/>
            <ShareSuccessModal id={MODAL_CARD_SHARE_SUCCESS} closeActiveModal={closeActiveModal} setActiveModal={setActiveModal}/>
        </ModalRoot>
    );

    return (
        <ModalContext.Provider value={{ modalElement: modal, setActiveModal, modalBack, closeActiveModal }}>
            {props.children}
        </ModalContext.Provider>
    )
}

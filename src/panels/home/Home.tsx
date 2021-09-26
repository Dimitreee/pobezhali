import { useRouter } from '@happysanta/router'
import { Icon24List } from '@vkontakte/icons'
import { Div, Avatar, Button, Panel, PanelHeader, Title } from '@vkontakte/vkui'
import { Icon56VideoCircleOutline } from '@vkontakte/icons';
import React, { useContext } from 'react'
import { ModalContext, MODAL_CARD_ENABLE_GEO } from '../../components/Modal/ModalContext'
import { Poster } from '../../components/Poster/Poster'
import { useAppSelector } from '../../features/store'
import { PAGE_FRIENDS, PAGE_RACES } from '../../routes'
import './Home.css'

export const Home = ({ id }) => {
	const router = useRouter()
	const { setActiveModal } = useContext(ModalContext)

	const activeUser = useAppSelector((state) => state.userSlice.user)

	return (
		<Panel id={id}>
			<PanelHeader left={
				<Button mode='secondary' onClick={() => router.pushPage(PAGE_FRIENDS)}>
					<Icon24List/>
				</Button>
			}>
				<Div>
					{
						activeUser?.photo_200
							? <Avatar src={activeUser.photo_200} onClick={() => router.pushPage(PAGE_RACES, { userId: activeUser.id })}/>
							: null
					}
				</Div>
			</PanelHeader>
			<Poster/>
			<div className='button_container'>
				<Title level='1' weight='semibold' style={{ marginBottom: 16 }}>Начать пробежку</Title>
				<Button mode='secondary' onClick={() => setActiveModal(MODAL_CARD_ENABLE_GEO)}>
					<Icon56VideoCircleOutline width={200} height={200}/>
				</Button>
			</div>
		</Panel>
	);
}

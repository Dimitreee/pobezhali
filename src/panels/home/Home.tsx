import { useRouter } from '@happysanta/router'
import { Icon24List } from '@vkontakte/icons'
import { Button, Panel, PanelHeader, Title } from '@vkontakte/vkui'
import { Icon56VideoCircleOutline } from '@vkontakte/icons';
import React from 'react'
import { PAGE_ACTIVE_RACE, PAGE_FRIENDS } from '../../routes'
import './Home.css'

export const Home = ({ id }) => {
	const router = useRouter()

	return (
		<Panel id={id}>
			<PanelHeader left={
				<Button mode='secondary' onClick={() => router.pushPage(PAGE_FRIENDS)}>
					<Icon24List/>
				</Button>
			}>
			</PanelHeader>
			<div className='button_container'>
				<Title level='1' weight='semibold' style={{ marginBottom: 16 }}>Начать пробежку</Title>
				<Button mode='secondary' onClick={() => router.pushPage(PAGE_ACTIVE_RACE)}>
					<Icon56VideoCircleOutline width={200} height={200}/>
				</Button>
			</div>
		</Panel>
	);
}

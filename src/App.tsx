import { PANEL_MAIN, useLocation, VIEW_MAIN } from '@happysanta/router'
import React, { useEffect, useContext } from 'react'
import { View, AdaptivityProvider, AppRoot, ScreenSpinner } from '@vkontakte/vkui'
import '@vkontakte/vkui/dist/vkui.css';
import { useDispatch } from 'react-redux'

import { ModalContext } from './components/Modal/ModalContext'
import { useAppSelector } from './features/store'
import { ActiveRace } from './panels/active_race/ActiveRace'
import { Friends } from './panels/friends/Friends'
import { Home } from './panels/home/Home';
import { Races } from './panels/races/Races';
import { Race } from './panels/race/Race';
import { setUser, setIsLoading, setAccessToken } from './features/user/userSlice'
import { PANEL_ACTIVE_RACE, PANEL_FRIENDS, PANEL_RACE, PANEL_RACES } from './routes'
import { getAuthToken, getUserInfo } from './utils/api'

const App = () => {
	const location = useLocation()
	const { modalElement } = useContext(ModalContext)
	const isUserLoading = useAppSelector((state) => state.userSlice.isLoading)

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(setIsLoading(true))

		async function initApp() {
			try {
				const user = await getUserInfo();
				const { access_token } = await getAuthToken()

				dispatch(setUser(user))
				dispatch(setAccessToken(access_token))
				dispatch(setIsLoading(false))
			} catch (e) {
				initApp()
			}
		}

		initApp();
	}, [dispatch]);

	return (
		<AdaptivityProvider>
			<AppRoot>
				<View
					id={VIEW_MAIN}
					activePanel={location.getViewActivePanel(VIEW_MAIN)}
					popout={isUserLoading ? <ScreenSpinner size='large' /> : null}
					modal={modalElement}
				>
					<Home id={PANEL_MAIN}/>
					<Races id={PANEL_RACES}/>
					<Race id={PANEL_RACE}/>
					<ActiveRace id={PANEL_ACTIVE_RACE}/>
					<Friends id={PANEL_FRIENDS}/>
				</View>
			</AppRoot>
		</AdaptivityProvider>
	);
}

export default App;

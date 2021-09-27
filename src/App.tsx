import { PANEL_MAIN, useLocation, VIEW_MAIN } from '@happysanta/router'
import React from 'react'
import { View, AdaptivityProvider, AppRoot } from '@vkontakte/vkui'
import '@vkontakte/vkui/dist/vkui.css';

import { ActiveRace } from './panels/active_race/ActiveRace'
import { Home } from './panels/home/Home'
import { Race } from './panels/race/Race'
import { PANEL_ACTIVE_RACE, PANEL_RACE } from './routes'

const App = () => {
	const location = useLocation()

	return (
		<AdaptivityProvider>
			<AppRoot>
				<View
					id={VIEW_MAIN}
					activePanel={location.getViewActivePanel(VIEW_MAIN)}
				>
					<Home id={PANEL_MAIN}/>
					<Race id={PANEL_RACE}/>
					<ActiveRace id={PANEL_ACTIVE_RACE}/>
				</View>
			</AppRoot>
		</AdaptivityProvider>
	);
}

export default App;

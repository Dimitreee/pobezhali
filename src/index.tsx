import { RouterContext } from '@happysanta/router'
import React from "react"
import ReactDOM from "react-dom"
import bridge from "@vkontakte/vk-bridge"
import { Provider as ReduxProvider } from 'react-redux'
import { store } from './features/store'
import App from "./App";
import { MapProvider } from './components/Map/Map'
import { ModalContextProvider } from './components/Modal/ModalContext'
import { router } from './routes'


bridge.send("VKWebAppInit");

router.start()

ReactDOM.render(
    <ReduxProvider store={store}>
        <RouterContext.Provider value={router}>
            <MapProvider>
                <ModalContextProvider>
                    <App />
                </ModalContextProvider>
            </MapProvider>
        </RouterContext.Provider>
    </ReduxProvider>,
    document.getElementById("root")
);

if (process.env.NODE_ENV === "development") {
    import("./eruda").then(({ default: eruda }) => {}); //runtime download
}

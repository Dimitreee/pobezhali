import { RouterContext } from '@happysanta/router'
import React from 'react'
import ReactDOM from 'react-dom'
import App from "./App";
import { router } from './routes'

router.start()

ReactDOM.render(
    <RouterContext.Provider value={router}>
        <App />
    </RouterContext.Provider>,
    document.getElementById("root")
);

if (process.env.NODE_ENV === "development") {
    import("./eruda").then(({ default: eruda }) => {}); //runtime download
}

import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import racesReducer from './races/racesSlice'
import activeRaceReducer from './acitveRace/activeRacesSlice'
import userSliceReducer from './user/userSlice'

const persistedState = localStorage.getItem('reduxState')
    ? JSON.parse(localStorage.getItem('reduxState'))
    : {}

export const store = configureStore({
    reducer: {
        races: racesReducer,
        activeRace: activeRaceReducer,
        userSlice: userSliceReducer,
    },
    preloadedState: persistedState
})

store.subscribe(() => {
    localStorage.setItem('reduxState', JSON.stringify(store.getState()))
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

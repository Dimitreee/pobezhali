import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    distance: 0,
    duration: {
        hours: 0,
        minutes: 0,
        seconds: 0,
    },
    isActive: false,
    path: [],
}

export const activeRaceSlice = createSlice({
    name: 'races',
    initialState: initialState,
    reducers: {
        updateDistance: (state, action) => {
            state.distance = action.payload
        },
        updateDuration: (state, action) => {
            state.duration = action.payload
        },
        resetRace: (state) => {
            state.distance = 0
            state.duration = {
                hours: 0,
                minutes: 0,
                seconds: 0,
            }
            state.isActive = false
            state.path = []
        },
        updateRacePath: (state, action) => {
            state.path.push(action.payload)
        }
    },
})

// Action creators are generated for each case reducer function
export const { updateDistance, updateDuration, resetRace, updateRacePath } = activeRaceSlice.actions

export default activeRaceSlice.reducer

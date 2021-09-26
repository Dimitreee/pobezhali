import { createSlice } from '@reduxjs/toolkit'

import mockRaces from '../mock_data.json'

export const racesSlice = createSlice({
    name: 'races',
    initialState: {
        races: mockRaces,
    },
    reducers: {
        addRace: (state, action) => {
            state.races.push(action.payload)
        },
        addRaces: (state, action) => {
            state.races = [...state.races, ...action.payload]
        }
    },
})

export const { addRace, addRaces } = racesSlice.actions

export default racesSlice.reducer



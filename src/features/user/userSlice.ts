import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'races',
    initialState: {
        user: null,
        accessToken: null,
        isLoading: false,
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload
        },
        setAccessToken: (state, action) => {
            state.accessToken = action.payload
        }
    },
})

export const { setUser, setIsLoading, setAccessToken } = userSlice.actions

export default userSlice.reducer



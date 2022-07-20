import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        loggedIn: false,
        token: '',
        name: '',
    },

    reducers : {
        updateLoggedIn: (state, action:PayloadAction<{token:string, name:string}>) => {
            state = {...state, 'loggedIn': true, 'token': action.payload.token, 'name': action.payload.name}
            console.log(state)
        }
    }
})

// export the actions of the redux and then finally export the reducer
export const {
    updateLoggedIn
} = userSlice.actions
export default userSlice.reducer
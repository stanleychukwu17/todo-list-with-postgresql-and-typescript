import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        loggedIn: false,
        jwtToken: '',
        userInfo: {
            name: 'stanley',
            email: 'stanley@gmail.com',
        },
    },
    reducers : {
        updateLoggedIn: (state) => { state.loggedIn = true}
    }
})

// export the actions of the redux and then finally export the reducer
export const {
    updateLoggedIn
} = userSlice.actions
export default userSlice.reducer
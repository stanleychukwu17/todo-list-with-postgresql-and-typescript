import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        loggedIn: false,
        jwtToken: 'dokeoekodekodekoedko',
        userInfo: {
            name: 'stanley',
            email: 'stanley@gmail.com',
        },
    },
    reducers : {
        updateLoggedIn: (state) => { state.loggedIn = true}
    }
})
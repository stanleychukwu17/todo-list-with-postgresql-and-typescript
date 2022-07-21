import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        loggedIn: false,
        token: '',
        name: '',
    },

    reducers : {
        // updates loggedIn state to true
        updateLoggedIn: (state, action:PayloadAction<{token:string, name:string}>) => {
            state.loggedIn = true;
            state.token = action.payload.token;
            state.name = action.payload.name;

            window.localStorage.setItem('todoUserDts', JSON.stringify({
                token: state.token,
                name: state.name
            }));
        },

        // updates loggedIn state to false
        updateLoggedOut: (state) => {
            state.loggedIn = false;
            state.token = '';
            state.name = '';
            window.localStorage.removeItem('todoUserDts');
        }
    }
})



// export the actions of the redux and then finally export the reducer
export const {
    updateLoggedIn,
    updateLoggedOut
} = userSlice.actions
export default userSlice.reducer
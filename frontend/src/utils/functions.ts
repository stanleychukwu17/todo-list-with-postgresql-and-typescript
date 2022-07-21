import { updateLoggedIn } from "../redux/userSlice"
import type {AppDispatch} from "../redux/store"

// the function checks if a user is logged in by checking the localStorage if there are any tokens saved
type ch1Type = {dispatch: AppDispatch}
export const check_this_user_is_logged_in = ({dispatch}: ch1Type) => {
    let dts1 = window.localStorage.getItem('todoUserDts')

    // if the user is not logged in, we check the localStorage to see if there are any stored details(i.e the user name and token)
    if (dts1 && dts1.length > 0) {
        let dts2 = JSON.parse(dts1)

        if (dts2.token.length > 0) {
            dispatch(updateLoggedIn(dts2))
            return true
        }
    }

    return false
}
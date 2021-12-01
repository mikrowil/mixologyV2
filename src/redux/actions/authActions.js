import {CHECK_AUTH} from "../types";
import {auth} from "../../configs/firebaseSetup";


/**
@deprecated
Listens for changes to user authentication
 */
export const checkAuth = () => async dispatch => {


    const checkIfLoggedIn = () => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                dispatch({type: CHECK_AUTH, payload: true})

            } else {
                dispatch({type: CHECK_AUTH, payload: false})
            }
        })
    }
    checkIfLoggedIn()


}



import {CHECK_AUTH, SIGN_IN, SIGN_UP, ERROR_MESSAGE} from "../types";
import {auth} from "../../configs/firebaseSetup";
import AsyncStorage from "@react-native-async-storage/async-storage"
import cocktailApi from "../../api/cocktailApi";


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

/**
 * Calls the backends signup route. This handles creating the user and saving the jsonwebtoken into asyncstorage
 * for authenticating the user and navigating to the main game.
 * @param username
 * @param password
 * @returns {(function(*): Promise<void>)|*}
 */
export const signUp = ({email, password}) => async dispatch => {

    try {
        const res = await cocktailApi.post('/signup', {email, password})
        await AsyncStorage.setItem('token', res.data.token)
        dispatch({type: SIGN_UP, payload: res.data.token})
    } catch (e) {

        dispatch({
            type: ERROR_MESSAGE, payload: 'Username already in use. ' +
                'Please use another username'
        })
    }

}

/**
 * Calls the backends signin route. This handles saving the jsonwebtoken into asyncstorage
 * for authenticating the user.
 * @param username
 * @param password
 * @returns {(function(*): Promise<void>)|*}
 */
export const signIn = ({email, password}) => async dispatch => {

    try {
        const res = await cocktailApi.post('/signin', {email, password})
        await AsyncStorage.setItem('token', res.data.token)
        dispatch({type: SIGN_UP, payload: res.data.token})
    } catch (e) {

        dispatch({
            type: ERROR_MESSAGE, payload: 'Username already in use. ' +
                'Please use another username'
        })
    }

}



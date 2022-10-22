import {CHECK_AUTH, SIGN_IN, SIGN_UP} from "../types";

/**
 * Initial state for the reducer
 * @type {{loggedIn: null}}
 */
const initState = {
    loggedIn: null,
    token:null,
}

/**
 * Reducer for authentication
 * @param state
 * @param action
 * @returns {{loggedIn: null}|{loggedIn}}
 */
export const authReducer = (state = initState, action) => {
    switch (action.type) {
        case CHECK_AUTH:
            return {...state, loggedIn: action.payload}
        case SIGN_UP:{
            return {...state, token: action.payload}
        }
        case SIGN_IN:{
            return {...state, token: action.payload}
        }
        default:
            return state
    }
}

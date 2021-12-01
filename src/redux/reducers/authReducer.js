import {CHECK_AUTH} from "../types";

/**
 * Initial state for the reducer
 * @type {{loggedIn: null}}
 */
const initState = {
    loggedIn: null,
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
        default:
            return state
    }
}

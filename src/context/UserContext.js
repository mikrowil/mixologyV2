import React from "react";
import createDataContext from "./createDataContext";

/**
@deprecated
 */
const userReducer = (state, action) => {
    switch (action.type) {
        case 'add_favorites':
            return state = action.payload
        case 'get_favorites':
            return state
        default:
            return state
    }
}

const addFavorites = (dispatch) => {
    return (myPay) => {
        dispatch({type: 'add_favorites', payload: myPay})
    }
}

const getFavorites = (dispatch) => {
    return () => {
        dispatch({type: 'get_favorites'})
    }
}

export const {Context, Provider} = createDataContext(userReducer, {addFavorites, getFavorites},
    [])

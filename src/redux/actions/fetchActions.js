import {auth, firestore} from "../../configs/firebaseSetup";
import {
    FETCH_COCKTAILS,
    FETCH_FAVORITES,
    FETCH_NEW,
    FETCH_POPULAR,
    FETCH_PUNCHES,
    FETCH_SHOTS,
    LOADING_COCKTAILS,
    LOADING_FAVORITES,
    LOADING_NEW,
    LOADING_POPULAR,
    LOADING_PUNCHES,
    LOADING_SHOTS,
    REFRESHING,
} from "../types";
import cocktailsApi from "../../api/cocktailApi";

/**
 Calls the backend api to get cocktails listed in the users favorites
 @returns {function} function that dispatches an action to redux reducer
 */
export const fetchFavorites = () => async dispatch => {

    try {
        const response = await firestore.collection("users").doc(auth.currentUser.uid).get()
        const res = response.data().favorites

        dispatch({type: FETCH_FAVORITES, payload: res})

    } catch (err) {
        const response = await firestore.collection("users").doc(auth.currentUser.uid).set({favorites: []})
        const res = []

        dispatch({type: FETCH_FAVORITES, payload: res})
    }
    dispatch({type: LOADING_FAVORITES, payload: false})
}

/**
 * Calls the backend api to get the most popular cocktails
 * @returns {(function(*=): Promise<void>)|*}
 */
export const fetchPopular = () => async dispatch => {
    toggleRefresh(dispatch, true)
    dispatch({type: LOADING_POPULAR, payload: true})

    try {
        const response = await cocktailsApi.get("/popular", [])
        //setCocktails(response.data.drinks)
        let myArr = response.data.drinks.filter((x) => x.idDrink !== "178361")

        dispatch({type: FETCH_POPULAR, payload: myArr})


    } catch (e) {
        //console.log(e)
    }
    toggleRefresh(dispatch, false)
    dispatch({type: LOADING_POPULAR, payload: false})
}

/**
 * Calls the backend api to get new beverages
 * @returns {(function(*): Promise<void>)|*} function that dispatches an action to redux reducer
 */
export const fetchNew = () => async dispatch => {
    dispatch({type: LOADING_NEW, payload: true})
    try {
        const response = await cocktailsApi.get(`/new`, [])
        let myArr = response.data.drinks.filter((x) => x.idDrink !== "178361")
        dispatch({type: FETCH_NEW, payload: myArr})
    } catch (err) {
        throw new Error('Unable to fetch new cocktails')
    }
    dispatch({type: LOADING_NEW, payload: false})
}

/**
 *  Calls the backend api to get cocktails
 * @returns {(function(*): Promise<void>)|*}
 */
export const fetchCocktails = () => async dispatch => {
    dispatch({type: LOADING_COCKTAILS, payload: true})
    try {
        const response = await cocktailsApi.get(`/cocktails`, [])
        let myArr = response.data.drinks.filter((x) => x.idDrink !== "178361")
        dispatch({type: FETCH_COCKTAILS, payload: myArr})
    } catch (err) {
        throw new Error('Unable to fetch type cocktails')
    }
    dispatch({type: LOADING_COCKTAILS, payload: false})
}

/**
 * Calls the backend api to get shots
 * @returns {(function(*): Promise<void>)|*}
 */
export const fetchShots = () => async dispatch => {
    dispatch({type: LOADING_SHOTS, payload: true})
    try {
        const response = await cocktailsApi.get(`/shots`, [])
        let myArr = response.data.drinks.filter((x) => x.idDrink !== "178361")
        dispatch({type: FETCH_SHOTS, payload: myArr})
    } catch (err) {
        throw new Error('Unable to fetch shots')
    }
    dispatch({type: LOADING_SHOTS, payload: false})
}

/**
 * Calls the backend api to get punches/ party drinks
 * @returns {(function(*): Promise<void>)|*}
 */
export const fetchPunches = () => async dispatch => {
    dispatch({type: LOADING_PUNCHES, payload: true})
    try {
        const response = await cocktailsApi.get(`/punches`, [])
        let myArr = response.data.drinks.filter((x) => x.idDrink !== "178361")
        dispatch({type: FETCH_PUNCHES, payload: myArr})
    } catch (err) {
        throw new Error('Unable to fetch new cocktails')
    }
    dispatch({type: LOADING_PUNCHES, payload: false})
}

/**
 * toggles is app refreshing
 * @param dispatch
 * @param action
 */
export const toggleRefresh = (dispatch, action) => {
    dispatch({type: REFRESHING, payload: action})
}

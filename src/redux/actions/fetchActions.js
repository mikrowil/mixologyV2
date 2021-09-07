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
    REFRESHING
} from "../types";
import cocktailsApi from "../../api/cocktailApi";


export const fetchFavorites = () => async dispatch => {

    try {
        const response = await firestore.collection("users").doc(auth.currentUser.uid).get()
        const res = response.data().favorites

        dispatch({type: FETCH_FAVORITES, payload: res})

    } catch (err) {

    }
    dispatch({type: LOADING_FAVORITES, payload: false})
}

export const fetchPopular = () => async dispatch => {
    toggleRefresh(dispatch, true)
    dispatch({type: LOADING_POPULAR, payload: true})

    try {
        const response = await cocktailsApi.get("/popular.php", [])
        //setCocktails(response.data.drinks)

        dispatch({type: FETCH_POPULAR, payload: response.data.drinks})


    } catch (e) {
        //console.log(e)
    }
    toggleRefresh(dispatch, false)
    dispatch({type: LOADING_POPULAR, payload: false})
}

export const fetchNew = () => async dispatch => {
    dispatch({type: LOADING_NEW, payload: true})
    try {
        const response = await cocktailsApi.get(`/latest.php`, [])
        dispatch({type: FETCH_NEW, payload: response.data.drinks})
    } catch (err) {
        throw new Error('Unable to fetch new cocktails')
    }
    dispatch({type: LOADING_NEW, payload: false})
}

export const fetchCocktails = () => async dispatch => {
    dispatch({type: LOADING_COCKTAILS, payload: true})
    try {
        const response = await cocktailsApi.get(`/filter.php?c=Cocktail`, [])
        dispatch({type: FETCH_COCKTAILS, payload: response.data.drinks})
    } catch (err) {
        throw new Error('Unable to fetch type cocktails')
    }
    dispatch({type: LOADING_COCKTAILS, payload: false})
}

export const fetchShots = () => async dispatch => {
    dispatch({type: LOADING_SHOTS, payload: true})
    try {
        const response = await cocktailsApi.get(`/filter.php?c=Shot`, [])
        dispatch({type: FETCH_SHOTS, payload: response.data.drinks})
    } catch (err) {
        throw new Error('Unable to fetch shots')
    }
    dispatch({type: LOADING_SHOTS, payload: false})
}
export const fetchPunches = () => async dispatch => {
    dispatch({type: LOADING_PUNCHES, payload: true})
    try {
        const response = await cocktailsApi.get(`/filter.php?c=Punch / Party Drink`, [])
        dispatch({type: FETCH_PUNCHES, payload: response.data.drinks})
    } catch (err) {
        throw new Error('Unable to fetch new cocktails')
    }
    dispatch({type: LOADING_PUNCHES, payload: false})
}

export const searchApi = (searchTerm) => async (dispatch) => {
    dispatch({type: LOADING_POPULAR, payload: true})
    try {
        const response = await cocktailsApi.get(`/search.php?s=${searchTerm}`, [])

        //setCocktails(response.data.drinks)
        dispatch({type: FETCH_POPULAR, payload: response.data.drinks})

    } catch (e) {
        throw new Error('There was an error with the searchApi')
    }
    dispatch({type: LOADING_POPULAR, payload: false})
}

export const toggleRefresh = (dispatch, action) => {
    dispatch({type: REFRESHING, payload: action})
}

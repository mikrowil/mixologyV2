import {auth, firestore} from "../../configs/firebaseSetup";
import {
    FETCH_COCKTAILS,
    FETCH_FAVORITES,
    FETCH_NEW,
    FETCH_POPULAR,
    FETCH_PUNCHES, FETCH_SEARCH,
    FETCH_SHOTS,
    LOADING_COCKTAILS,
    LOADING_FAVORITES,
    LOADING_NEW,
    LOADING_POPULAR,
    LOADING_PUNCHES, LOADING_SEARCH,
    LOADING_SHOTS,
    REFRESHING,
    SEARCH_TERM
} from "../types";
import cocktailsApi from "../../api/cocktailApi";


export const fetchFavorites = () => async dispatch => {

    try {
        const response = await firestore.collection("users").doc(auth.currentUser.uid).get()
        const res = response.data().favorites

        dispatch({type: FETCH_FAVORITES, payload: res})

    } catch (err) {
        const response = await firestore.collection("users").doc(auth.currentUser.uid).set({favorites:[]})
        const res = []

        dispatch({type: FETCH_FAVORITES, payload: res})
    }
    dispatch({type: LOADING_FAVORITES, payload: false})
}

export const fetchPopular = () => async dispatch => {
    toggleRefresh(dispatch, true)
    dispatch({type: LOADING_POPULAR, payload: true})

    try {
        const response = await cocktailsApi.get("/popular.php", [])
        //setCocktails(response.data.drinks)
        let myArr = response.data.drinks.filter((x)=> x.idDrink !== "178361")

        dispatch({type: FETCH_POPULAR, payload: myArr})


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
        let myArr = response.data.drinks.filter((x)=> x.idDrink !== "178361")
        dispatch({type: FETCH_NEW, payload: myArr})
    } catch (err) {
        throw new Error('Unable to fetch new cocktails')
    }
    dispatch({type: LOADING_NEW, payload: false})
}

export const fetchCocktails = () => async dispatch => {
    dispatch({type: LOADING_COCKTAILS, payload: true})
    try {
        const response = await cocktailsApi.get(`/filter.php?c=Cocktail`, [])
        let myArr = response.data.drinks.filter((x)=> x.idDrink !== "178361")
        dispatch({type: FETCH_COCKTAILS, payload: myArr})
    } catch (err) {
        throw new Error('Unable to fetch type cocktails')
    }
    dispatch({type: LOADING_COCKTAILS, payload: false})
}

export const fetchShots = () => async dispatch => {
    dispatch({type: LOADING_SHOTS, payload: true})
    try {
        const response = await cocktailsApi.get(`/filter.php?c=Shot`, [])
        let myArr = response.data.drinks.filter((x)=> x.idDrink !== "178361")
        dispatch({type: FETCH_SHOTS, payload: myArr})
    } catch (err) {
        throw new Error('Unable to fetch shots')
    }
    dispatch({type: LOADING_SHOTS, payload: false})
}
export const fetchPunches = () => async dispatch => {
    dispatch({type: LOADING_PUNCHES, payload: true})
    try {
        const response = await cocktailsApi.get(`/filter.php?c=Punch / Party Drink`, [])
        let myArr = response.data.drinks.filter((x)=> x.idDrink !== "178361")
        dispatch({type: FETCH_PUNCHES, payload: myArr})
    } catch (err) {
        throw new Error('Unable to fetch new cocktails')
    }
    dispatch({type: LOADING_PUNCHES, payload: false})
}

export const searchApi = (searchTerm) => async (dispatch) => {
    dispatch({type: LOADING_SEARCH, payload: true})
    try {
        const response = await cocktailsApi.get(`/search.php?s=${searchTerm}`, [])
        let myArr = response.data.drinks.filter((x)=> x.idDrink !== "178361")
        //setCocktails(response.data.drinks)
        dispatch({type: FETCH_SEARCH, payload: myArr})
        dispatch({type:SEARCH_TERM, payload:searchTerm})

    } catch (e) {
        throw new Error('There was an error with the searchApi')
    }
    dispatch({type: LOADING_SEARCH, payload: false})
}

export const setSearchTerm = (term) => dispatch =>{
    dispatch({type:SEARCH_TERM, payload:term})
}

export const toggleRefresh = (dispatch, action) => {
    dispatch({type: REFRESHING, payload: action})
}

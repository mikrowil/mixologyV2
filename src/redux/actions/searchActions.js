import {FETCH_SEARCH, LOADING_SEARCH, SEARCH_TERM} from "../types";
import cocktailsApi from "../../api/cocktailApi";

/**
 * Uses a search term to fetch beverages from the backend
 * @param searchTerm
 * @returns {(function(*): Promise<void>)|*}
 */
export const searchApi = (searchTerm) => async (dispatch) => {
    dispatch({type: LOADING_SEARCH, payload: true})
    try {
        const response = await cocktailsApi.get(`/search`, {
            params:{
                term:searchTerm
            }
        })
        let drinks = response.data.drinks

        //setCocktails(response.data.drinks)
        dispatch({type: FETCH_SEARCH, payload: drinks})

    } catch (e) {
        const response = []

        //setCocktails(response.data.drinks)
        dispatch({type: FETCH_SEARCH, payload: response})
    }
    dispatch({type: SEARCH_TERM, payload: searchTerm})
    dispatch({type: LOADING_SEARCH, payload: false})
}

export const setSearchTerm = (term) => dispatch => {
    dispatch({type: SEARCH_TERM, payload: term})
}

import {FETCH_SEARCH, LOADING_SEARCH, SEARCH_TERM} from "../types";

/**
 * Reducers initial state
 * @type {{searchResult: string, searchTerm: string, searchLoading: boolean}}
 */
const initState = {
    searchTerm:'',
    searchResult:'',
    searchLoading: false
}

/**
 * Reducer for search actions
 * @param state
 * @param action
 * @returns {{searchResult, searchTerm: string, searchLoading: boolean}|{searchResult: string, searchTerm: string, searchLoading: boolean}|{searchResult: string, searchTerm, searchLoading: boolean}|{searchResult: string, searchTerm: string, searchLoading}}
 */
export const searchReducer = (state=initState, action)=>{
    switch (action.type){
        case SEARCH_TERM:
            return{...state, searchTerm: action.payload}
        case FETCH_SEARCH:
            return{...state, searchResult: action.payload}
        case LOADING_SEARCH:
            return{...state, searchLoading: action.payload}
        default:
            return state
    }
}

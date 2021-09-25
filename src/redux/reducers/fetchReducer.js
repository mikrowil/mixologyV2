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
    REFRESHING, SEARCH_TERM,
} from "../types";

const initState = {
    search:[],
    searchTerm:"",
    favorites: -1,
    popular: [],
    newest: [],
    cocktails: [],
    shots: [],
    punches: [],
    isLoadingSearch:false,
    isLoadingFavorites: true,
    isLoadingPopular: true,
    isLoadingNewest: true,
    isLoadingCocktails: true,
    isLoadingShots: true,
    isLoadingPunches: true,
    isRefreshing: false,
}


export const fetchReducer = (state = initState, action) => {
    switch (action.type) {
        case FETCH_FAVORITES:
            return {...state, favorites: action.payload}
        case LOADING_FAVORITES:
            return {...state, isLoadingFavorites: action.payload}
        case FETCH_SEARCH:
            return {...state, search: action.payload}
        case LOADING_SEARCH:
            return {...state, isLoadingSearch: action.payload}
        case LOADING_POPULAR:
            return {...state, isLoadingPopular: action.payload}
        case REFRESHING :
            return {...state, isRefreshing: action.payload}
        case FETCH_POPULAR:
            return {...state, popular: action.payload}
        case FETCH_NEW:
            return {...state, newest: action.payload}
        case LOADING_NEW:
            return {...state, isLoadingNewest: action.payload}
        case FETCH_COCKTAILS:
            return {...state, cocktails: action.payload}
        case LOADING_COCKTAILS:
            return {...state, isLoadingCocktails: action.payload}
        case FETCH_SHOTS:
            return {...state, shots: action.payload}
        case LOADING_SHOTS:
            return {...state, isLoadingShots: action.payload}
        case FETCH_PUNCHES:
            return {...state, punches: action.payload}
        case LOADING_PUNCHES:
            return {...state, isLoadingPunches: action.payload}
        case SEARCH_TERM:
            return {...state, searchTerm: action.payload}
        default:
            return state
    }
}

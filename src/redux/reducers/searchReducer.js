import {FETCH_SEARCH, LOADING_SEARCH, SEARCH_TERM} from "../types";

const initState = {
    searchTerm:'',
    searchResult:'',
    searchLoading:false
}

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

import {CHECK_AUTH, FETCH_FAVORITES, FETCH_POPULAR, LOADING_FAVORITES, LOADING_POPULAR, REFRESHING} from "../types";

const initState={
    loggedIn:null,
}

export const authReducer = (state=initState,action)=>{
    switch (action.type){
        case CHECK_AUTH:
            return {...state,loggedIn: action.payload}
        default:
            return state
    }
}

import {CHECK_AUTH} from "../types";

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

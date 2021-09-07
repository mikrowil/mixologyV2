import {CHECK_AUTH, FETCH_FAVORITES, LOADING_FAVORITES, LOADING_POPULAR, FETCH_POPULAR, REFRESHING} from "../types";
import {auth, firestore} from "../../configs/firebaseSetup";



export const checkAuth = () => async dispatch => {


    const checkIfLoggedIn = () => {
        auth.onAuthStateChanged((user) =>{
            if(user){
                dispatch({type:CHECK_AUTH,payload:true})

            }else {
                dispatch({type:CHECK_AUTH,payload:false})
            }
        })
    }
    checkIfLoggedIn()


}



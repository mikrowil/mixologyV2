import {combineReducers} from 'redux'
import {authReducer} from "./reducers/authReducer";
import {fetchReducer} from "./reducers/fetchReducer";

const rootReducer = combineReducers({
    auth:authReducer,
    fetch:fetchReducer,
})

export default rootReducer

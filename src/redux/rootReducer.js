import {combineReducers} from 'redux'
import {authReducer} from "./reducers/authReducer";
import {fetchReducer} from "./reducers/fetchReducer";
import {searchReducer} from "./reducers/searchReducer";

const rootReducer = combineReducers({
    auth:authReducer,
    fetch:fetchReducer,
    search:searchReducer
})

export default rootReducer

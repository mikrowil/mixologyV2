import {applyMiddleware, createStore} from "redux";
import rootReducer from "./rootReducer";
import ReduxThunk from 'redux-thunk';

/** The index file for redux */
export const store = createStore(rootReducer, applyMiddleware(ReduxThunk))

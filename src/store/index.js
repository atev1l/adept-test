import {legacy_createStore as createStore, applyMiddleware, combineReducers} from "redux"
import {catsReducer} from "./catsReducer";
import {companiesReducer} from "./companiesReducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({cats: catsReducer, companies: companiesReducer})

export const store = createStore(rootReducer, applyMiddleware(thunk))

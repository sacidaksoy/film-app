import { combineReducers } from "redux";
import movie from "./movie";
import auth from  "./auth";
import { movieActions } from "./movie";
import { authActions } from "./auth";

const rootReducer = combineReducers({auth, movie});

export {
    rootReducer,
    movieActions,
    authActions,
}
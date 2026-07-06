import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authReducer"
import userReducer from "./userReducer";

export const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer
    // posts: postsReducer,
})
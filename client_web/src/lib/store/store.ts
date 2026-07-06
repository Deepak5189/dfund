import {configureStore} from "@reduxjs/toolkit";
import {tokenMiddleware} from "../middlewares/tokenMiddleware"
import { initializeAuth } from "./actions/authActions";
import { rootReducer } from "./reducers";

export const createAppStore = ()=>{
    try{
        const store = configureStore({
            reducer: rootReducer,
            middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(tokenMiddleware),
        });

        store.dispatch(initializeAuth());

        return store;
    }catch(error){
        throw new Error(`Failed to create store: ${error}`);
    }
}

export type AppDispatch =
  Awaited<ReturnType<typeof createAppStore>>["dispatch"];
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import todoReducer from "./reducers/userSlice";
import {loggerMiddleware} from "./reducers/loggerMiddleware";
import {localStorageMiddleware} from "./reducers/localTodoMiddleware";

const mainReducer = combineReducers({
    todoReducer
});

export const appStore = configureStore({
    reducer: mainReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(loggerMiddleware).concat(localStorageMiddleware),
})
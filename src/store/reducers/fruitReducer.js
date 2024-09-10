import {createAction, createReducer, createSelector} from "@reduxjs/toolkit";


const initialState = ["apple", "banana", "cherry", "elderberry"];

export const deleteFruit = createAction("DELETE_FRUIT");

export const fruitReducer = createReducer(initialState, (builder) => {
    builder.addCase(deleteFruit, (state, action) => state.filter((fruit) => fruit !== action.payload));
});

const fruits = (state) => state.fruits;

export const selectFruits = createSelector([fruits], (fruits) => fruits);


export const selectFruitsWithNumber = createSelector(
    [fruits, (fruits, num) => num],
    (fruits, num) => fruits.length > num
);


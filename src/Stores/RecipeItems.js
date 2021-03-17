import {recipeStore} from "./RecipeStore";
import {createStore} from "redux";

export const ADD_RECIPE = 'ADD_RECIPE'
export const REMOVE_RECIPE = 'REMOVE_RECIPE'
export const SET_INITIAL = 'SET_INITIAL'
export const UPDATE = 'UPDATE'

const recipeItemsReducer = (state, action) => {
    switch (action.type) {
        case SET_INITIAL:
            return [...action.payload]
        case ADD_RECIPE:
            recipeStore.addItem(action.payload)
            return [...state, action.payload]
        case REMOVE_RECIPE:
            recipeStore.deleteItem(action.payload)
            return state.filter(recipeItem => recipeItem.id !== action.payload)
        case UPDATE:
            recipeStore.updateItem(action.payload.itemIndex, action.payload.newItem)
            const newState = [...state]
            newState[action.payload.itemIndex] = action.payload.newItem
            return newState
    }
    return state
}

const store = createStore(recipeItemsReducer, recipeStore.recipes);

export default store;
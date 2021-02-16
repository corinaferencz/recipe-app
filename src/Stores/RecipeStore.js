import AsyncStorage from '@react-native-async-storage/async-storage';
import {observable} from "mobx";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

class RecipeStore {
    userDetails = {firstName: "Corina", surname: "Ferencz"}
    @observable recipes = [];

    constructor() {
        AsyncStorage.getItem("recipeList").then((res) => {
            this.recipes = JSON.parse(res) || []
        })
    }

    addItem = (item) => {
            item.id = uuidv4();
            this.recipes.push(item);
            AsyncStorage.setItem("recipeList", JSON.stringify(this.recipes));
    }

    deleteItem = (itemIndex) => {
        this.recipes.splice(itemIndex, 1);
        AsyncStorage.setItem("recipeList", JSON.stringify(this.recipes));
    }

    updateItem = (item) => {
        this.recipes.map((recipe, index) => {
            if (recipe.id === item.id) {
                this.recipes[index] = {...recipe,...item};
            }
        })
        AsyncStorage.setItem("recipeList", JSON.stringify(this.recipes));
    }
}

const recipeStore = new RecipeStore();

export default recipeStore;

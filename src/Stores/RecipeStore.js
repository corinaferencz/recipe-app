import AsyncStorage from '@react-native-async-storage/async-storage';
import {observable} from "mobx";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

class RecipeStore {
    @observable userDetails = {username: "", imgUri:""};
    @observable recipes = [];

    constructor() {
        AsyncStorage.getItem("recipeList").then((res) => {
            this.recipes = JSON.parse(res) || []
        }).catch((error) => {console.log('async error constructor',error)})
        AsyncStorage.getItem("user").then((res) => {
            this.userDetails = JSON.parse(res) || []
        }).catch((error) => {console.log('async error constructor',error)})
    }

    addUser = (user) => {
        this.userDetails = {username: user.username, imgUri: user.imgUri};
        console.log(this.userDetails);
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

    updateItem = (itemIndex, item) => {
        this.recipes[itemIndex] = item;
        AsyncStorage.setItem("recipeList", JSON.stringify(this.recipes));
    }
}

const recipeStore = new RecipeStore();

export default recipeStore;

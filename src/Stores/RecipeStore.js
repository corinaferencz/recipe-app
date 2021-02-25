import AsyncStorage from '@react-native-async-storage/async-storage';
import {observable} from "mobx";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

class RecipeStore {
    @observable userDetails = {username: "", imgUri:""};
    @observable selectors = {userRegistered: false};
    @observable recipes = [];

    constructor() {
        AsyncStorage.getItem("recipeList").then((res) => {
            this.recipes = JSON.parse(res) || []
        }).catch((error) => {console.log('async error constructor',error)})
        AsyncStorage.getItem("user").then((res) => {
            this.userDetails = JSON.parse(res) || {}
        }).catch((error) => {console.log('async error constructor',error)})
        AsyncStorage.getItem("selector").then((res) => {
            this.selectors = JSON.parse(res) || {}
        }).catch((error) => {console.log('async error constructor',error)})
    }

    handleSelectors = (state) => {
        this.selectors.userRegistered = state;
        AsyncStorage.setItem('selector', JSON.stringify(this.selectors));
    }

    addUser = (user) => {
        this.userDetails = {username: user.username, imgUri: user.imgUri};
        AsyncStorage.setItem("user", JSON.stringify(this.userDetails));
        this.handleSelectors(true);

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
        console.log("Update item triggered")
        this.recipes[itemIndex] = item;
        AsyncStorage.setItem("recipeList", JSON.stringify(this.recipes));
    }
}

const recipeStore = new RecipeStore();

export default recipeStore;

import AsyncStorage from '@react-native-async-storage/async-storage';

class RecipeStore {
    userDetails = {firstName: "Corina", surname: "Ferencz"}
    recipes = [];

    constructor() {
        AsyncStorage.getItem("recipeList").then((res) => {
            this.recipes = JSON.parse(res) || []
        })
    }

    addItem = (item) => {
        this.recipes.push(item);
        AsyncStorage.setItem("recipeList", JSON.stringify(this.recipes));
    }

    deleteItem = (item) => {
        console.log(this.recipes.includes(item));
        console.log(item);
        let index = this.recipes.indexOf(item);
        console.log("Index", index);
        // this.recipes.splice(index, 1);
        // AsyncStorage.setItem("recipeList", JSON.stringify(this.recipes));
    }
}

const recipeStore = new RecipeStore();

export default recipeStore;

import recipesList from "../DummyData/RecipeDummyData";

class RecipeStore {
    userDetails = {firstName: "Corina", surname: "Ferencz"}
    recipes = [];

    addItem = (item) => {
        recipesList.push(item);
    }

    constructor(recipes) {
        this.recipes = recipes;
    }
}

const recipeStore = new RecipeStore(recipesList);

export default recipeStore;

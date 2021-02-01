import recipesList from "../DummyData/RecipeDummyData";

class RecipeStore {
    userDetails = {firstName: "Corina", surname: "Ferencz"}
    recipes = [];

    constructor(recipes) {
        this.recipes = recipes;
    }
}

const recipeStore = new RecipeStore(recipesList);

const addItem = (item) => {
    recipesList.push(item);
}

export default recipeStore; addItem();

import { RecipeModel } from '../Model';

class FavorModel {
  constructor() {
    this.recipeModel = new RecipeModel();
  }
  getFavorRecipe() {
    this.recipeModel.getFavorRecipe();
    return this.recipeModel.getRecipe();
  }
}

export default FavorModel;
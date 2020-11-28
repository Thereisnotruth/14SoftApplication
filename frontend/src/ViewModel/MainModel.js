import { RecipeModel } from '../Model';

class MainModel {
  constructor() {
    this.recipeModel = new RecipeModel();
  }
  getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === ' ')
        c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0)
        return c.substring(nameEQ.length, c.length);
    }
    return null;
  }
  getRecommendedRecipe() {
    this.recipeModel.getRecommendedRecipe();
    return this.recipeModel.getRecipe();
  }

  getRecipe() {
    this.recipeModel.getRecipes();
    return this.recipeModel.getRecipe();
  }

  search(str) {
    this.recipeModel.search(str);
    return this.recipeModel.getRecipe();
  }

  async whatRecipeShouldBeSeen() {
    const check = this.getCookie('access_cookie');
    console.log('로그인 ? ' + check);
    if (check === null) {
      return this.getRecipe()
    } else {
      return this.getRecommendedRecipe();
    }
  }
}

export default MainModel;
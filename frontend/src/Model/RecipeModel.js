import axios from 'axios';

class RecipeModel {
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
    this.recipe = axios.post('/v1/recommended', {
      userId: this.getCookie('access_cookie')
    });

  }

  getRecipes() {
    this.recipe = axios.get('/v1/recipe');
  }
  
  search(str) {
    const keyword = str.split(/(?:,| )/);
    this.recipe = axios.post('/v1/search', {
      keyword: keyword,
    });
  }
  getFavorRecipe() {
    this.recipe = axios.post('/v1/favor', {
      userId: this.getCookie('access_cookie')
    });
  }
  getRecipe() {
    return this.recipe;
  }
}
export default RecipeModel
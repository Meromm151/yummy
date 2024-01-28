// api class structure
export default class Api {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }
  async searchMealByName(name) {
    let response = await fetch(`${this.baseURL}search.php?s=${name}`);
    let json = await response.json();
    return json.meals;
  }
  async searchMealByFirstLetter(letter) {
    let response = await fetch(`${this.baseURL}search.php?f=${letter}`);
    let json = await response.json();
    return json.meals;
  }
  async lookupFullMealDetailsById(id) {
    let response = await fetch(`${this.baseURL}lookup.php?i=${id}`);
    let json = await response.json();
    return json;
  }
  async categoriesList() {
    let response = await fetch(`${this.baseURL}categories.php`);
    let json = await response.json();
    return json.categories;
  }
  async categoriesFilter(categoryName) {
    let response = await fetch(`${this.baseURL}filter.php?c=${categoryName}`);
    let json = await response.json();
    return json.meals;
  }
  async areasList() {
    let response = await fetch(`${this.baseURL}list.php?a=list`);
    let json = await response.json();
    return json.meals;
  }
  async areasFilter(areaName) {
    let response = await fetch(`${this.baseURL}filter.php?a=${areaName}`);
    let json = await response.json();
    return json.meals;
  }
  async ingredientsList() {
    let response = await fetch(`${this.baseURL}list.php?i=list`);
    let json = await response.json();
    return json;
  }
  async ingredients(ingredientName) {
    let response = await fetch(`${this.baseURL}filter.php?i=${ingredientName}`);
    let json = await response.json();
    return json.meals;
  }
}
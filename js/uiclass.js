export default class Ui {
  constructor() {
    this.sidebarBtn = $(".open-btn");
    this.sideBar = $(".side-bar");
    this.viewPort = $("#viewport .view-port .row");
    this.loadingScreen = $(".loading");
  }
  // building Meals Container function initial
  async buildingMealsContainer(api) {
    let json = await api;
    let container = "";
    json.forEach((element) => {
      let item = ` <div class="col-12 col-sm-4 col-md-4 col-lg-3">
            <div class="item m-3 rounded-4 overflow-hidden" mealId="${element.idMeal}">
              <img src="../image/placeholder.png" alt="" class="lazy-loaded-image lazy" data-src="${element.strMealThumb}" >
              <div class="item-after the-meal t-100">${element.strMeal}</div>
            </div>
            <div mealIdPage="${element.idMeal}"></div>
          </div>`;
      container += item;
    });

    return container;
  }
  // building Categories Container function initial
  async buildingCategoriesContainer(api) {
    let json = await api;
    let container = "";
    json.forEach((element) => {
      let item = `
    <div class="col-12 col-sm-4 col-md-4 col-lg-3">
      <div class="item m-3 rounded-4 overflow-hidden" catName="${
        element.strCategory
      }">
        <img src="${element.strCategoryThumb}" alt="">
        <div class="item-after item-after-cat flex-column t-100">
          <h3>
            ${element.strCategory}
          </h3>
          <p class="fs-6 fw-normal catigory-desc">${element.strCategoryDescription.slice(
            0,
            100
          )}</p>
        </div>
      </div>
    </div>
    `;
      container += item;
    });
    return container;
  }
  // building Areas Container function initial
  async buildingAreasContainer(api) {
    let json = await api;
    let container = "";
    json.forEach((element) => {
      let item = `
      <div class="col-md-3">
        <div class="item country m-3 rounded-4 overflow-hidden text-center"">
          <div class="layer d-flex" areaName="${element.strArea}"></div>
          <div class="country"><i class="fa-solid fa-earth-americas fs-70"></i></div>
          <p class="fs-40">${element.strArea}</p>
        </div>
      </div>
      `;
      container += item;
    });
    return container;
  }
  async buildingIngredientsContainer(api) {
    let json = await api;
    console.log(json);
    json = json.meals.slice(0, 19);
    let container = "";
    json.forEach((element) => {
      let item = `
      <div class="col-md-3">
        <div class="item country m-3 rounded-4 overflow-hidden text-center"">
          <div class="layer d-flex" ingredientName="${element.strIngredient}"></div>
          <div class="country"><i class="fa-solid fa-drumstick-bite fs-70"></i></i></div>
          <p class="fs-4 text-white">${element.strIngredient}</p>
          <p class="fs-6 text-white ingredient">${element.strDescription}</p>
        </div>
      </div>
      `;
      container += item;
    });
    return container;
  }
  buildFormContainer() {
    let container = `
    <form>
    <div class="row align-items-center justify-content-center g-0 ">
      <div class="col-md-6 p-0 pe-md-3 parent">
        <input placeholder="Enter Your Name" type="text" class="form-control bg-dark p-2 text-white" id="contactName">
        <p class="validationMSG"></p>
      </div>
      <div class="col-md-6 p-0 ps-md-3 parent">
        <input placeholder="Enter Your Email" type="email" class="form-control bg-dark p-2 text-white" id="contactMail">
        <p class="validationMSG"></p>
      </div>
      <div class="col-md-6 p-0 pe-md-3 parent">
        <input placeholder="Enter Your Phone" type="tel" class="form-control bg-dark p-2 text-white" id="contactPhone">
        <p class="validationMSG"></p>
      </div>
      <div class="col-md-6 p-0 ps-md-3 parent">
        <input placeholder="Enter Your Age" type="number" class="form-control bg-dark p-2 text-white" id="contactAge">
        <p class="validationMSG"></p>
      </div>
      <div class="col-md-6 p-0 pe-md-3 parent">
        <input placeholder="Enter Your Password" type="password" class="form-control bg-dark p-2 text-white" id="contactPassword">
        <p class="validationMSG"></p>
      </div>
      <div class="col-md-6 p-0 ps-md-3 parent">
        <input placeholder="Repassword" type="password" class="form-control bg-dark p-2 text-white" id="contactRepassword">
        <p class="validationMSG"></p>
      </div>
      <div class="col-md-1 m-auto">
        <button class="btn border-danger text-danger d-block m-auto" disabled >submit</button>
      </div>
    </div>
  </form>
    `;
    return container;
  }
  // building Meal Page Container function initial
  buildingMealPageContainer(meal) {
    function recipes() {
      let container = "";
      for (let i = 1; i < 20; i++) {
        if (meal[`strMeasure${i}`] != false) {
          container += `
        <div class="btn btn-info m-1 pe-none">
          ${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}
        </div>`;
        }
      }
      return container;
    }
    function tags() {
      let tarArr;
      if (meal.strTags != null) {
        tarArr = meal.strTags.split(",");
        let container = "";
        tarArr.forEach((e) => {
          container += `<div class="btn btn-danger me-2 pe-none">${e}</div>`;
        });
        return container;
      } else {
        return "";
      }
    }
    let container = `
      <div class="item-page bg-dark text-white">
        <div class="text-end text-white  fs-1 ">
          <i class="fa-solid fa-xmark p-2 pe-4"></i>
        </div>
        <div class="container">
          <div class="row g-4">
            <div class="col-md-4">
              <div class="img-container rounded-4 overflow-hidden">
                <img src="${meal.strMealThumb}" alt="">
              </div>
            </div>
            <div class="col-md-8">
              <div class="info">
                <h3 class="fs-1">Instructions</h3>
                <p>${meal.strInstructions}</p>
              </div>
              <div class="area fs-2 fw-bold">
                Area : ${meal.strArea}
              </div>
              <div class="catigory fs-2 fw-bold">
                Catigory : ${meal.strCategory}
              </div>
            </div>
            <div class="col-md-4">
              <div class="meal-name fs-2 fw-bold">
                ${meal.strMeal}
              </div>
            </div>
            <div class="col-md-8">
            <div class="Recipes">
              ${recipes(meal)}
            </div>
            <div class="tag mt-3">
              <h3>Tags:</h3>
                ${tags(meal)}
            </div>
              <div class="my-2">
                <a href="${
                  meal.strSource
                }" target="_blank" class="btn btn-success me-2">Source</a>
                <a href="${
                  meal.strYoutube
                }" target="_blank" class="btn btn-danger">Youtube</a>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    `;
    return container;
  }
}

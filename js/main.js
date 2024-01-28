import Api from "./apiclass.js";
import Ui from "./uiclass.js";
import Form from "./formclass.js";

let ui = new Ui();
let mealApi = new Api("https://www.themealdb.com/api/json/v1/1/");

// sidbar open
ui.sidebarBtn.on("click", (e) => {
  if ($(".fa-bars").length != 0) {
    $(e.target)
      .parents(".apper-bar")
      .siblings(".hidden-bar")
      .animate({ width: "250px" });
    $(".fa-bars").removeClass("fa-bars").addClass("fa-xmark");
    for (let i = 0; i < 5; i++) {
      $($(".hidden-bar li")[i])
        .delay(100 * i)
        .animate({ top: "0" }, 500);
    }
  } else {
    $(e.target)
      .parents(".apper-bar")
      .siblings(".hidden-bar")
      .animate({ width: "0px" });
    $(".side-bar .fa-xmark").removeClass("fa-xmark").addClass("fa-bars");
    $(".hidden-bar li").animate({ top: "300px" }, 500);
  }
});

// side bar links on click
$(".hidden-bar ul li").on("click", (e) => {
  $(".hidden-bar").animate({ width: "0px" });
  $(".side-bar .fa-xmark").removeClass("fa-xmark").addClass("fa-bars");
  $(".hidden-bar li").animate({ top: "300px" }, 500);

  switch ($(e.target).attr("section")) {

    // ********************************** search link **********************************
    case "search":
      $(".my-header .row").html(
        `
          <div class="col-md-6 p-3">
            <input placeholder="Search by name" class="form-control p-3 bg-dark text-white" type="text" func="search" id="searchByName">
          </div>
          <div class="col-md-6 p-3">
            <input placeholder="Search by letter" class="form-control p-3 bg-dark text-white" type="text" func="search" id="searchByletter" maxlength="1">
          </div>
          `
      );
      if (
        $("#searchByName").val().length == 0 &&
        $("#searchByletter").val().length == 0
      ) {
        $(".view-port .row").html("");
      }
      inputSearchEvent();
      break;

    // ********************************** categories link **********************************
    case "categories":
      (async function () {
        $(".my-header .row").html("");
        await sequence(
          ui.buildingCategoriesContainer(mealApi.categoriesList())
        );
        $(".item-after").on("click", (e) => {
          sequence(
            ui.buildingMealsContainer(
              mealApi.categoriesFilter(
                $(e.target).parents(".item").attr("catname")
              )
            )
          );
        });
      })();
      break;

    // ********************************** area link **********************************
    case "area":
      (async function () {
        $(".my-header .row").html("");
        await sequence(ui.buildingAreasContainer(mealApi.areasList()));
        $($(`.layer`)).on("click", (e) => {
          sequence(
            ui.buildingMealsContainer(
              mealApi.areasFilter($(e.target).attr(`areaName`))
            )
          );
        });
      })();
      break;

    // ********************************** ingredients link **********************************
    case "ingredients":
      (async function () {
        $(".my-header .row").html("");
        await sequence(
          ui.buildingIngredientsContainer(mealApi.ingredientsList())
        );
        $($(`.layer`)).on("click", (e) => {
          sequence(
            ui.buildingMealsContainer(
              mealApi.ingredients($(e.target).attr(`ingredientName`))
            )
          );
        });
      })();
      break;

    // ********************************** contactUs link **********************************
    case "contactUs":
      (async function () {
        $(".my-header .row").html("");
        $(".view-port .row").html(ui.buildFormContainer());
        let regex = {
          name: /^([a-z]|[A-Z]){4,40}$/,
          email:
            /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
          phone: /^(\+2)?0(10|11|12|15)[0-9]{8}$/,
          age: /^(1[89]|[2-9]\d)$/,
          password:
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        };
        let form = new Form(
          $("#contactName"),
          regex.name,
          $("#contactMail"),
          regex.email,
          $("#contactPhone"),
          regex.phone,
          $("#contactAge"),
          regex.age,
          $("#contactPassword"),
          regex.password,
          $("#contactRepassword")
        );
        for (let prop in form) {
          $(form[prop]["selector"]).on("input", (e) => {
            if (
              $(e.target).attr("id") == $(form.repassword.selector).attr("id")
            ) {
              if (
                $(form.password.selector).val() ==
                $(form.repassword.selector).val()
              ) {
                form.repassword.valid.value = true;
                $(form.repassword.selector)
                  .siblings("p")
                  .html(form.repassword["valid"]["trueMSG"])
                  .css({ color: "green", fontSize: "12" });
              } else {
                form.repassword.valid.value = false;
                $(form.repassword.selector)
                  .siblings("p")
                  .html(form.repassword["valid"]["trueMSG"])
                  .css({ color: "red", fontSize: "12" });
              }
            } else {
              if (form[prop]["regex"].test($(e.target).val())) {
                form[prop]["valid"]["value"] = true;
                $(form[prop]["selector"])
                  .siblings("p")
                  .html(form[prop]["valid"]["trueMSG"])
                  .css({ color: "green", fontSize: "12" });
              } else if (!form[prop]["regex"].test($(e.target).val())) {
                form[prop]["valid"]["value"] = false;
                $(form[prop]["selector"])
                  .siblings("p")
                  .html(form[prop]["valid"]["falseMSG"])
                  .css({ color: "red", fontSize: "12" });
              }
            }
            if (form.isAllValid()) {
              $("form button").removeAttr("disabled");
            } else {
              $("form button").attr("disabled", "disabled");
            }
          });
        }
      })();
      break;
  }
});

    // ********************************** search section input listener **********************************
function inputSearchEvent() {
  $(`[func="search"]`).on("input", (e) => {
    if (
      $(e.target).attr("id") == "searchByName" &&
      $(e.target).val().length > 0
    ) {
      sequence(
        ui.buildingMealsContainer(mealApi.searchMealByName($(e.target).val()))
      );
    } else if (
      $(e.target).attr("id") == "searchByletter" &&
      $(e.target).val().length > 0
    ) {
      console.log($(e.target).val());
      sequence(
        ui.buildingMealsContainer(
          mealApi.searchMealByFirstLetter($(e.target).val())
        )
      );
    } else if (
      $("#searchByName").val().length == 0 &&
      $("#searchByletter").val().length == 0
    ) {
      $(".view-port .row").html("");
    }
  });
}

    // ********************************** building viewport and displaying based on api called and adding item on click event **********************************
async function sequence(api) {
  let response = await api;
  await ui.viewPort.html(response);
  $(".loading").fadeOut(1000, () => {
    $(".loading").addClass("d-none");
  });
  $(".the-meal").on("click", async (e) => {
    let json = await mealApi.lookupFullMealDetailsById(
      $(e.target).parents("[mealId]").attr("mealId")
    );
    $("html, body").css({ overflow: "hidden", height: "100%" });
    let mealPage = ui.buildingMealPageContainer(json.meals[0]);
    $(`[mealidpage="${$(e.target).parents("[mealId]").attr("mealId")}"]`)
      .html(mealPage)
      .children(".item-page")
      .animate({ minHeight: "100vh", paddingBlock: "15px" });
    $(".fa-xmark").on("click", (e) => {
      $(e.target)
        .parents(".item-page")
        .animate({ minHeight: "0", paddingBlock: "0px" });
      $("html, body").css({ overflow: "auto", height: "100%" });
    });
  });
}
sequence(ui.buildingMealsContainer(mealApi.searchMealByName("")));

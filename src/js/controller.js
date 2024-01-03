import * as model from "./model.js";
import recipeView from "./view/recipeView.js";

import "core-js/stable";
import "regenerator-runtime/runtime";
import recipeView from "./view/recipeView.js";

const { async } = require("regenerator-runtime");

const recipeContainer = document.querySelector(".recipe");

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();

    // 1) Loading Recipe
    await model.loadRecipe(id);

    // 2) Render the data
    recipeView.render(model.state.recipe);
  } catch (err) {
    alert(err);
  }
};
["hashchange", "load"].forEach((ev) =>
  window.addEventListener(ev, controlRecipes)
);

import * as model from "./model.js";
import { MODAL_CLOSE_SEC } from "./config.js";
import recipeView from "./view/recipeView.js";
import searchView from "./view/searchView.js";
import resultsView from "./view/resultsView.js";
import paginationView from "./view/paginationView.js";
import bookmarksView from "./view/bookmarksView.js";
import addRecipeView from "./view/addRecipeView.js";

import "core-js/stable";
import "regenerator-runtime/runtime";
import { async } from "regenerator-runtime";

const controlRecipes = async function () {
  try {
    // Get ID
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();

    // 0. Update Results view to mark selected search result
    resultsView.update(model.getSearchResultsPage());

    // 1. Loading Recipe
    await model.loadRecipe(id);

    // 2. Render the data
    recipeView.render(model.state.recipe);

    // 3. Updating Bookmarks View
    bookmarksView.update(model.state.bookmarks);
  } catch (err) {
    recipeView.renderError();
    console.error(err);
  }
};

const controlSearchResults = async function () {
  try {
    // 0. Render Spinner
    resultsView.renderSpinner();

    // 1. Get Search Query
    const query = searchView.getQuery();
    if (!query) return;

    // 2. Load Search Results
    await model.loadSearchResults(query);

    // 3. Render Results
    resultsView.render(model.getSearchResultsPage());

    // 4. Render Pagination
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (goToPage) {
  // 1. Render New Results
  resultsView.render(model.getSearchResultsPage(goToPage));

  // 2. Render New Pagination btn
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  // 1. Update the servings in state
  model.updateServings(newServings);

  // 2. Update the recipe view
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  // 1. Add/remove bookamrk
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  // 2. Update recipe view
  recipeView.update(model.state.recipe);

  // 3. Render Bookamrks
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    // 0. Render Spinner
    addRecipeView.renderSpinner();

    // 1. Upload the new Recipe
    await model.uploadRecipe(newRecipe);

    // 2. Render the new recipe data
    recipeView.render(model.state.recipe);

    // 3. Success Message
    addRecipeView.renderMessage();

    // 4. Render Bookamrk View
    bookmarksView.render(model.state.bookmarks);

    // 5. Change ID in URL
    window.history.pushState(null, "", `#${model.state.recipe.id}`);

    // 6. Close form window
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    console.error(err, `✨`);
    addRecipeView.renderError(err.message);
  }
};

const WelcomeFunction = function () {
  console.log(`
  ██╗  ██╗███████╗██╗     ██╗      ██████╗     ██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗ 
  ██║  ██║██╔════╝██║     ██║     ██╔═══██╗    ██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
  ███████║█████╗  ██║     ██║     ██║   ██║    ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
  ██╔══██║██╔══╝  ██║     ██║     ██║   ██║    ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
  ██║  ██║███████╗███████╗███████╗╚██████╔╝    ╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
  ╚═╝  ╚═╝╚══════╝╚══════╝╚══════╝ ╚═════╝      ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝ 
  
  Hi Geek, 
  I love to be friends with like minded people. Message me, maybe we could help each other.
  Cheers,
  JR.Pranav
  mailto: pranav@jrpranav.com`);
};

const init = function () {
  WelcomeFunction();
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();

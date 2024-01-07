import View from "./View";

class AddRecipeView extends View {
  _overlay = document.querySelector(".overlay");
  _message = `Recipe was succesfully uploaded :)`;
  _parentEl = document.querySelector(".upload");
  _window = document.querySelector(".add-recipe-window");
  _btnClose = document.querySelector(".btn--close-modal");
  _btnOpen = document.querySelector(".nav__btn--add-recipe");

  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }

  // Toggle Open & Close - Window
  toggleWindow() {
    this._overlay.classList.toggle("hidden");
    this._window.classList.toggle("hidden");
  }

  _addHandlerShowWindow() {
    this._btnOpen.addEventListener("click", this.toggleWindow.bind(this));
  }

  _addHandlerHideWindow() {
    this._btnClose.addEventListener("click", this.toggleWindow.bind(this));
    this._overlay.addEventListener("click", this.toggleWindow.bind(this));
  }

  // Upload Feature - Form Submission
  addHandlerUpload(handler) {
    this._parentEl.addEventListener("submit", function (e) {
      e.preventDefault();

      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }

  _generateMarkup() {}
}
export default new AddRecipeView();

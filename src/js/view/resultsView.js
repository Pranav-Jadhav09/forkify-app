import View from "./View";
import icons from "url:../../assets/icons.svg";

class ResultsView extends View {
  _parentEl = document.querySelector(".results");
  _errorMessage = `No recipes found for your query! Please try again :)`;
  _message = `Start by searching for a recipe or an ingredient. Have fun!`;

  _generaterMarkup() {
    return this._data.map(this._generateMarkupPreview).join("");
  }

  _generateMarkupPreview(result) {
    return `<li class="preview">
    <a href="#${result.id}" class="preview__link">
      <figure class="preview__fig">
        <img src="${result.image}" alt="${result.title}" />
      </figure>

      <div class="preview__data">
        <h4 class="preview__title">${result.title}</h4>
        <p class="preview__publisher">${result.publisher}</p>
      </div>
    </a>
  </li>`;
  }
}
export default new ResultsView();

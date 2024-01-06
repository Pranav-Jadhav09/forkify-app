import View from "./View";
import icons from "url:../../assets/icons.svg";

class bookmarksView extends View {
  _parentEl = document.querySelector(".bookmarks__list");
  _errorMessage = `No boomarks yet. Find a nice recipe and bookamrk it :)`;
  _message = ``;

  _generaterMarkup() {
    return this._data.map(this._generateMarkupPreview).join("");
  }

  _generateMarkupPreview(result) {
    const id = window.location.hash.slice(1);

    return `<li class="preview">
    <a href="#${result.id}" class="preview__link ${
      result.id === id ? "preview__link--active" : ""
    }">
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
export default new bookmarksView();

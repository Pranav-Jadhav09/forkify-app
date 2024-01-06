import View from "./View";
import previewView from "./previewView";
import icons from "url:../../assets/icons.svg";

class bookmarksView extends View {
  _parentEl = document.querySelector(".bookmarks__list");
  _errorMessage = `No bookmarks yet. Find a nice recipe and bookmark it :)`;
  _message = ``;

  addHandlerRender(handler) {
    window.addEventListener("load", handler);
  }

  _generaterMarkup() {
    console.log(this._data);
    return this._data
      .map((bookmark) => previewView.render(bookmark, false))
      .join("");
  }
}
export default new bookmarksView();

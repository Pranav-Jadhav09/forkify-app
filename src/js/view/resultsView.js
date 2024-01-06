import View from "./View";
import previewView from "./previewView";
import icons from "url:../../assets/icons.svg";

class ResultsView extends View {
  _parentEl = document.querySelector(".results");
  _errorMessage = `No recipes found for your query! Please try again :)`;
  _message = `Start by searching for a recipe or an ingredient. Have fun!`;

  _generaterMarkup() {
    console.log(this._data);
    return this._data
      .map((result) => previewView.render(result, false))
      .join("");
  }
}
export default new ResultsView();

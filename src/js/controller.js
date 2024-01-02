const recipeContainer = document.querySelector(".recipe");

const timeOut = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeput after ${s} seconds`));
    }, s * 1000);
  });
};

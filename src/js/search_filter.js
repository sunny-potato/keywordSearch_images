import { searchParmeters } from "./query.js";
import { setImageElement, currentKeyword } from "./search.js";

let checkedOrientation;
let checkedSize;
let checkedColor;

const orientationOptions = document.querySelectorAll(
  'input[id="filterOrientation"] + label + div > input[id^="option"]'
);
const orientationFilter = document.querySelector(
  'input[id="filterOrientation"]'
);

orientationOptions.forEach((option) =>
  option.addEventListener("change", (option) => {
    if (option.target.checked) {
      checkedOrientation = option.target.id.replace("option", "");
      console.log(checkedOrientation);
      orientationFilter.checked = false;
      const displayOrientation = orientationFilter.nextElementSibling;
      if (checkedOrientation === "Allorientations") {
        displayOrientation.textContent = "All orientations";
        checkedOrientation = "orientation";
      } else {
        displayOrientation.textContent = `${checkedOrientation}`;
      }
      displayOrientation.style.backgroundColor = "lightgrey";
      console.log(checkedOrientation);
      searchParmeters({
        query: currentKeyword,
        orientation: checkedOrientation.toLowerCase(),
        size: checkedSize,
        color: checkedColor,
      }).then((data) => {
        const dataImages = data.photos;
        setImageElement(dataImages);
        option.target.checked = false;
      });
    }
  })
);

const sizeOptions = document.querySelectorAll(
  'input[id="filterSize"] + label + div > input[id^="option"]'
);
const sizeFilter = document.querySelector('input[id="filterSize"]');

sizeOptions.forEach((option) =>
  option.addEventListener("change", (option) => {
    if (option.target.checked) {
      checkedSize = option.target.id.replace("option", "");
      sizeFilter.checked = false;
      const displaySize = sizeFilter.nextElementSibling;
      if (checkedSize === "Allsizes") {
        displaySize.textContent = "All sizes";
        checkedSize = undefined;
      } else {
        displaySize.textContent = `${checkedSize}`;
      }
      displaySize.style.backgroundColor = "lightgrey";
      console.log(checkedOrientation, checkedSize, checkedColor);
      searchParmeters({
        query: currentKeyword,
        orientation: checkedOrientation,
        size: checkedSize,
        color: checkedColor,
      }).then((data) => {
        const dataImages = data.photos;
        setImageElement(dataImages);
        option.target.checked = false;
      });
    }
  })
);

const colorOptions = document.querySelectorAll(
  'input[id="filterColor"] + label + div > input[id^="option"]'
);
const colorFilter = document.querySelector('input[id="filterColor"]');
colorOptions.forEach((option) => {
  option.addEventListener("change", (option) => {
    if (option.target.checked) {
      checkedColor = option.target.id.replace("option", "");
      colorFilter.checked = false;
      const displayColor = colorFilter.nextElementSibling;
      if (checkedColor === "Allcolors") {
        displayColor.textContent = "All colors";
        checkedColor = undefined;
      } else {
        displayColor.textContent = `${checkedColor}`;
      }
      displayColor.style.backgroundColor = "lightgrey";
      console.log(checkedOrientation, checkedSize, checkedColor);
      searchParmeters({
        query: currentKeyword,
        orientation: checkedOrientation,
        size: checkedSize,
        color: checkedColor,
      }).then((data) => {
        const dataImages = data.photos;
        setImageElement(dataImages);
        option.target.checked = false;
      });
    }
  });
});

colorOptions.forEach((option) => {
  const checkedColor = option.id.replace("option", "");
  const eachOptionColor = option.nextElementSibling;
  if (checkedColor === "Allcolors") {
    eachOptionColor.style.backgroundImage =
      "linear-gradient(to left, violet, indigo, blue, green, yellow, orange, red)";
  }
  if (checkedColor === "Black") {
    eachOptionColor.style.color = `white`;
  }
  eachOptionColor.style.backgroundColor = `${checkedColor}`;
});

// import { createFilter } from "vite";
import { searchParmeters } from "/src/query";
import { setImageElement, currentKeyword } from "/src/search";

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
      orientationFilter.checked = false;
      const displayOrientation = orientationFilter.nextElementSibling;
      if (checkedOrientation === "Allorientations") {
        displayOrientation.textContent = "All orientations";
        checkedOrientation = undefined;
      } else {
        displayOrientation.textContent = `${checkedOrientation}`;
      }

      // const expandIcon = document.querySelector("span.expandIcon");
      // orientationFilter.nextElementSibling.appendChild(expandIcon);
      // orientationFilter.nextElementSibling.appendChild(expandIcon);
      displayOrientation.style.backgroundColor = "lightgrey";
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
    // eachOptionColor.style.backgroundColor = `${checkedColor}`;
    if (option.target.checked) {
      checkedColor = option.target.id.replace("option", "");
      colorFilter.checked = false;
      const displayColor = colorFilter.nextElementSibling;
      if (checkedColor === "Allcolors") {
        displayColor.textContent = "All colors";
        // displayColor.style.backgroundImage =
        //   "linear-gradient(to left, violet, indigo, blue, green, yellow, orange, red)";
        checkedColor = undefined;
      } else {
        displayColor.textContent = `${checkedColor}`;
        // displayColor.style.backgroundImage = "transparent";
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

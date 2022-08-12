import { searchParmeters } from "/src/query";
import { setImageElement, currentKeyword } from "/src/search";

const orientationOptions = document.querySelectorAll(
  'input[id="filterOrientation"] + label + div > input[id^="option"]'
);
const orientationFilter = document.querySelector(
  'input[id="filterOrientation"]'
);
const sizeOptions = document.querySelectorAll(
  'input[id="filterSize"] + label + div > input[id^="option"]'
);
const colorOptions = document.querySelectorAll(
  'input[id="filterColor"] + label + div > input[id^="option"]'
);

orientationOptions.forEach((option) => {
  option.addEventListener("change", (option) => {
    if (option.target.checked) {
      orientationFilter.checked = false;
      const checkedOption = option.target.id
        .replace("option", "")
        .toLowerCase();
      //   console.log(checkedOption);
      console.log(currentKeyword);
      searchParmeters({
        query: currentKeyword,
        orientation: checkedOption,
      }).then((data) => {
        const dataImages = data.photos;
        // console.log(dataImages);
        setImageElement(dataImages);
        option.target.checked = false;
        console.log(currentKeyword);
      });
    }
  });
});

orientationOptions.forEach((option) => {
  option.addEventListener("change", (option) => {
    console.log(option.target);
    if (option.target.checked) {
      orientationFilter.checked = false;
      const checkedOption = option.target.id
        .replace("option", "")
        .toLowerCase();
      console.log(checkedOption);
      searchParmeters({
        query: currentKeyword,
        orientation: checkedOption,
      }).then((data) => {
        const dataImages = data.photos;
        console.log(dataImages);
        setImageElement(dataImages);
        option.target.checked = false;
      });
    }
  });
});

const searchImage = document.querySelector(".searchImage");

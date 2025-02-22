import { searchPexels } from "./query.js";
import { displayFullImage } from "./search_popup.js";

const searchButton = document.querySelector(".searchButton");
const searchImage = document.querySelector(".searchImage");
const keywordDeleteButton = document.querySelector(".keywordDeleteButton");
const noticeInvalidInfo = document.querySelector(".noticeInvalidInfo");
const filterContainer = document.querySelector(".filterContainer");

export let currentKeyword;

function executeSearch() {
  currentKeyword = searchImage.value;
  searchPexels({ query: currentKeyword }).then((data) => {
    const dataImages = data.photos;
    if (currentKeyword === "" || dataImages.length === 0) {
      deleteAllImages();
      noticeInvalidInfo.style.visibility = "visible";
      filterContainer.style.visibility = "hidden";
    } else {
      noticeInvalidInfo.style.visibility = "hidden";
      keywordDeleteButton.style.visibility = "visible";
      filterContainer.style.visibility = "visible";
      setImageElement(dataImages);
    }
  });
}
searchButton.addEventListener("click", executeSearch);
searchImage.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    executeSearch();
    //reset filter
  }
});

searchImage.addEventListener("input", (event) => {
  if (event.target.value !== "") {
    noticeInvalidInfo.style.visibility = "hidden";
    keywordDeleteButton.style.visibility = "visible";
  } else {
    keywordDeleteButton.style.visibility = "hidden";
  }
});

keywordDeleteButton.addEventListener("click", () => {
  searchImage.value = "";
  keywordDeleteButton.style.visibility = "hidden";
});

// delete alle the images displayed on the screen when new keyword input
const displayImages = document.querySelector(".displayImages");
function deleteAllImages() {
  while (displayImages.firstChild) {
    displayImages.removeChild(displayImages.firstChild);
  }
}

// display images from the result of data
export function setImageElement(images) {
  deleteAllImages();
  images.forEach((image, index) => {
    const imageTag = document.createElement("img");
    const imageUrl = image.src.medium;
    const imageAlt = image.alt;
    imageTag.setAttribute("src", imageUrl);
    imageTag.setAttribute("alt", imageAlt);

    const imageInfo = document.createElement("div");
    imageInfo.setAttribute("class", "imageInformation");

    const imageDiv = document.createElement("div");
    imageDiv.setAttribute("class", `eachImage imageIndex_${index}`);
    imageDiv.appendChild(imageTag);
    imageDiv.appendChild(imageInfo);
    displayImages.appendChild(imageDiv);
  });
  const allImages = displayImages.childNodes;
  for (let i = 0; i < allImages.length; i++) {
    allImages[i].addEventListener("click", () => {
      displayFullImage(images[i]);
    });
  }
}

/* History API -> https://developer.mozilla.org/en-US/docs/Web/API/History_API 
keep the page showing the part of the image */

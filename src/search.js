// get data from API
async function searchPexels({ query, per_page = 10, page = 1 }) {
  const url = `https://api.pexels.com/v1/search?query=${query}&per_page=${per_page}&page=${page}`;
  const response = await fetch(url, {
    headers: {
      Authorization: "563492ad6f91700001000001f1647e79f1a54953a8047c68e4eef595",
    },
  });
  if (!response.ok) {
    throw new Error("fetch didn't work : " + response.status);
  }
  const data = await response.json();
  const dataImages = data.photos;
  setImageElement(dataImages);
}

const searchButton = document.querySelector(".searchButton");
const searchImage = document.querySelector(".searchImage");

searchButton.addEventListener("click", () => {
  const queryImage = searchImage.value;
  searchPexels({ query: queryImage });
  // console.log(displayImages.childNodes.length);
});

// delete alle the images displayed on the screen when new keyword input
const displayImages = document.querySelector(".displayImages");
function deleteAllImages() {
  while (displayImages.firstChild) {
    displayImages.removeChild(displayImages.firstChild);
  }
}

// display images from the result of data
function setImageElement(images) {
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

    const imageInformation = document.querySelector(
      `div.imageIndex_${index}>.imageInformation`
    );
  });
  const allImages = displayImages.childNodes;
  for (let i = 0; i < allImages.length; i++) {
    allImages[i].addEventListener("click", () => {
      // console.log(i, images[i], allImages[i]);
      displayFullImage(images[i]);
    });
  }
}

const popupContainer = document.querySelector(".popupContainer");
const popupImage = document.querySelector(".popupImage");
function displayFullImage(activeImage) {
  const currentImage = activeImage;
  if (popupImage.firstChild || popupImageInfo.firstChild) {
    popupImage.removeChild(popupImage.firstChild);
    popupImageInfo.removeChild(popupImageInfo.firstChild);
  }
  addImage(currentImage);
  addImageData(currentImage);
  popupContainer.style.visibility = "visible";
  displayImages.style.display = "none";
}

function addImage(image) {
  const popupimageTag = document.createElement("img");
  const popupimageUrl = image.src.medium;
  const popupimageAlt = image.alt;
  popupimageTag.setAttribute("src", popupimageUrl);
  popupimageTag.setAttribute("alt", popupimageAlt);
  const popupImageLink = document.createElement("a");
  popupImageLink.setAttribute("href", image.url);
  popupImageLink.setAttribute("target", "_bank");
  popupImageLink.setAttribute(
    "title",
    "click the image to go to original image on Pexels"
  );
  popupImageLink.appendChild(popupimageTag);
  popupImage.appendChild(popupImageLink);
  // console.log(image);
}

const popupImageInfo = document.querySelector(".popupImageInfo");
function addImageData(imageInfo) {
  const infoContent = document.createElement("div");
  const photographerName = document.createElement("div");
  photographerName.textContent = `Photographer : ${imageInfo.photographer}`;
  const imageDescription = document.createElement("div");
  imageDescription.textContent = `Photo description : ${imageInfo.alt}`;
  const imageSize = document.createElement("div");
  imageSize.textContent = `Origianl photo size (width*height) : ${imageInfo.width} * ${imageInfo.height}`;
  const imageOrigin = document.createElement("div");
  imageOrigin.textContent = "This Photo provided by Pexels";

  infoContent.append(
    photographerName,
    imageDescription,
    imageSize,
    imageOrigin
  );
  popupImageInfo.appendChild(infoContent);
}

const popupCloseButton = document.querySelector(".popupCloseButton");
popupCloseButton.addEventListener("click", () => {
  popupContainer.style.visibility = "hidden";
  displayImages.style.display = "flex";
});

/* History API -> https://developer.mozilla.org/en-US/docs/Web/API/History_API 
keep the page showing the part of the image */

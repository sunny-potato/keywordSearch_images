const displayContainer = document.querySelector(".displayContainer");
const popupContainer = document.querySelector(".popupContainer");
const popupImage = document.querySelector(".popupImage");

export function displayFullImage(activeImage) {
  const currentImage = activeImage;
  console.log(currentImage);
  if (popupImage.firstChild || popupImageInfo.firstChild) {
    popupImage.removeChild(popupImage.firstChild);
    popupImageInfo.removeChild(popupImageInfo.firstChild);
  }
  addImage(currentImage);
  addImageData(currentImage);
  popupContainer.style.visibility = "visible";
  displayContainer.style.display = "none";
}

function addImage(image) {
  const popupimageTag = document.createElement("img");
  const popupimageUrl = image.src.medium;
  const popupimageAlt = image.alt;
  popupimageTag.setAttribute("src", popupimageUrl);
  popupimageTag.setAttribute("alt", popupimageAlt);
  const popupImageLink = document.createElement("a");
  popupImageLink.setAttribute("href", image.url);
  popupImageLink.setAttribute("target", "_blank");
  popupImageLink.setAttribute(
    "title",
    "click the image to go to original image on Pexels"
  );
  popupImageLink.appendChild(popupimageTag);
  popupImage.appendChild(popupImageLink);
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
  imageOrigin.textContent = "This Photo is provided by Pexels";

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
  displayContainer.style.display = "inline-block";
});

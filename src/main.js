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
  getDataImages(dataImages);
}

const searchButton = document.querySelector(".searchButton");
const searchImage = document.querySelector(".searchImage");
searchButton.addEventListener("click", () => {
  const queryImage = searchImage.value;
  searchPexels({ query: queryImage });
});

const displayImages = document.querySelector(".displayImages");
function getDataImages(images) {
  images.forEach((image, index) => {
    const imageTag = document.createElement("img");
    const imageUrl = image.src.medium;
    const imageAlt = image.alt;
    imageTag.setAttribute("src", imageUrl);
    imageTag.setAttribute("alt", imageAlt);

    const imageDiv = document.createElement("div");
    imageDiv.setAttribute("class", `eachImage imageIndex_${index}`);
    imageDiv.appendChild(imageTag);
    displayImages.appendChild(imageDiv);
  });
}

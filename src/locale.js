async function localePexels({ query, per_page = 10, page = 1 }) {
  const url = `https://api.pexels.com/v1/search?query=${query}&per_page=${per_page}&page=${page}`;
  const LocaleResponse = await fetch(url, {
    headers: {
      Authorization: "563492ad6f91700001000001f1647e79f1a54953a8047c68e4eef595",
    },
  });
  if (!LocaleResponse.ok) {
    throw new Error("fetch didn't work : " + LocaleResponse.status);
  }

  const data = await LocaleResponse.json();
  console.log(data);
  //   const dataImages = data.photos;
}

localePexels({ query: "north korea" });

// get data from API
export async function searchPexels({ query, per_page = 20, page = 2 }) {
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
  return data;
}

// get data with parameters from API
export async function searchParmeters({
  query,
  orientation = undefined,
  size = undefined,
  color = undefined,
  per_page = 10,
  page = 1,
}) {
  const url = `https://api.pexels.com/v1/search?query=${query}&orientation=${orientation}&size=${size}&color=${color}&per_page=${per_page}&page=${page}`;
  const response = await fetch(url, {
    headers: {
      Authorization: "563492ad6f91700001000001f1647e79f1a54953a8047c68e4eef595",
    },
  });
  if (!response.ok) {
    throw new Error("fetch didn't work : " + response.status);
  }

  // console.log(orientation);
  const data = await response.json();
  return data;
}

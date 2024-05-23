import { apiKey, urlSongCate } from "/src/constants/env";

const getSongCate = async () => {
  try {
    const response = await fetch(`${urlSongCate}`, {
      headers: {
        "x-api-key": apiKey,
      },
    });
    const data = await response.json();
    return data.statusCode === 200 ? data.metadata : [];
  } catch (error) {
    console.error("Error fetching song categories:", error);
    return [];
  }
};

export default getSongCate;

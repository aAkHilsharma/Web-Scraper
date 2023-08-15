import axios from "axios";

const getScrapedData = async (url) => {
  try {
    const response = await axios.post(
      `/api/scrape`,
      { url },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { getScrapedData };

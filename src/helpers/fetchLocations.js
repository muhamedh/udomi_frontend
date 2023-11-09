import axios from "axios";

export const fetchLocations = async () => {
    axios.defaults.baseURL = process.env.REACT_APP_API_ENDPOINT;
    // console.log("Fetched locations");
    const { data } = await axios.get("/location", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return data;
};
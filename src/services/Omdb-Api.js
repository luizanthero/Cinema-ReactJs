import Axios from "axios";

const Api = Axios.create({
  baseURL: "http://www.omdbapi.com",
});

export default Api;

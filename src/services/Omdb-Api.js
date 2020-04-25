import Axios from "axios";

const Api = Axios.create({
  baseURL: "http://www.omdbapi.com/?apikey=f2396906",
});

export default Api;

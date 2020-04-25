import Axios from "axios";

const Api = Axios.create({ baseURL: "http://localhost:3333" });

export default Api;

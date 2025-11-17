import axios from "axios";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;
axios.defaults.headers["Content-Type"] = "application/json";

export default axios;

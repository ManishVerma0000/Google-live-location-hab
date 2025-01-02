import axios from "axios";

const api = axios.create({
  baseURL: "http://3.27.245.147:3000/", 
  timeout: 100000, 
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
 
import axios from "axios";

export default axios.create({
  baseURL: "https://ilumeo-teste-backend-2.onrender.com/",
  timeout: 10000,
  headers: { "Content-type": "application/json" },
});
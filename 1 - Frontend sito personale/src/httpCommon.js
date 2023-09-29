import axios from "axios";

const SERVER_API_URL = process.env.REACT_APP_SERVER_API_URL;

export default axios.create({
  baseURL: SERVER_API_URL,
  headers: {
    "Content-type": "application/json"
  }
});
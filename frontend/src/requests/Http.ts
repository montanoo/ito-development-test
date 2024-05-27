import axios from "axios";

const Http = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`,
});

Http.interceptors.request.use((config) => {
  // could be a bad practice, would be better to just encrypt and use random hash to save token on local storage.
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export default Http;

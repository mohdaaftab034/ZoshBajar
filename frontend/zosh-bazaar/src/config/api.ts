import axios from "axios";

const baseURL = import.meta.env.VITE_BACKEND_URL || "/api";

export const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});


import axios from 'axios';

const API = axios.create({
  baseURL: `${IP_NETWORK}/manager`,
  withCredentials: true
});

API.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export function register(data) {
  return API.post("/create_account",data);
}

export function getAllUser() {
  return API.get("/users");
}
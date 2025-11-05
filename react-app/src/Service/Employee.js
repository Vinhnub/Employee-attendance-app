import axios from 'axios';

const API = axios.create({
  baseURL: `${IP_NETWORK}/employee`,
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

export function start_shift(data) {
  return API.post("/start_shift", data);
}

export function shifts() {
  return API.get("/shifts");
}

export function CheckOut() {
  return API.put("/end_shift");
}

export function OverTime(data) {
  return API.put("/edit_shift",data);
}
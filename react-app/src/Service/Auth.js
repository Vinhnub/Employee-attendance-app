import axios from 'axios';

const API = axios.create({
  baseURL: `${IP_NETWORK}/auth`
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


export function login(data) {
  return API.post("/login", data);
}

export function changePassword(data) {
  return API.put("/change_password",data);
}

export function me() {
  return API.put("/me");
}

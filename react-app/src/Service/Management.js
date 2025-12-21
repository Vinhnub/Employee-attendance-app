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
  return API.post("/create_account", data);
}

export function getAllUser() {
  return API.get("/users");
}

export function deleteUser(id) {
  return API.delete(`/users/${id}`);
}

export function getUser(id) {
  return API.get(`/users/${id}`);
}
export function resetPassword(id, password) {
  return API.put(`/users/${id}/reset_password`, password);
}

export function getUserShifts(id) {
  return API.get(`/users/${id}/shifts`);
}

export function editShifts(uid, sid, shifts) {
  return API.put(`/users/${uid}/shifts/${sid}/edit_shift`, shifts);
}

export function getUserLogs(id) {
  return API.get(`/users/${id}/logs`);
}

export function getAllShifts() {
  return API.get(`/shifts`);
}

export function endShifts(id) {
  return API.put(`/shifts/${id}/end_shift`);
}

export function getLogs(date) {
  return API.get(`/logs/${date}`);
}

export function refreshSheet() {
  return API.put(`/refresh_sheet`);
}

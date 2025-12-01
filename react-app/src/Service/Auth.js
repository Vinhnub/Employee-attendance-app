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
  // Check if user data is cached
  const cachedUser = sessionStorage.getItem("user");
  if (cachedUser) {
    return Promise.resolve({
      data: {
        status: "success",
        data: JSON.parse(cachedUser)
      }
    });
  }

  // If not cached, make API call and cache the result
  return API.get("/me").then(response => {
    if (response.data.status === "success") {
      sessionStorage.setItem("user", JSON.stringify(response.data.data));
    }
    return response;
  });
}

export function logout() {
  return API.put("/logout");
}

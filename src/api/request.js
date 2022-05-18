import axios from "axios";

const request = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

request.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token && token != undefined && token != null && token != "") {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

request.interceptors.response.use(
  (resp) => {
    let response = resp.data;
    if (response.code == 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }

    return resp;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default {
  withdrawList(page, pageSize) {
    return request.get("/withdrawlist", {
      params: {
        page: page,
        pageSize: pageSize,
        status: "waiting_pay",
      },
    });
  },

  statistics() {
    return request.get("/statistics");
  },

  confirm(id) {
    return request.get("/confirm", {
      params: {
        id: id,
      },
    });
  },

  reject(id, message) {
    return request.get("/reject", {
      params: {
        id: id,
        message: message,
      },
    });
  },

  login(uname, password) {
    return request.post("/login", {
      uname: uname,
      password: password,
    });
  },
};

import axios from "axios";

const instance = axios.create({
  baseURL: "https://www.freedom-day.site/api/test/graph1", // TODO: env로 변경 예정
  timeout: 2000,
  headers: {
    "Content-Type": "application/json",
  },
});

// TODO) json 형식 추가 예정
instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    console.error(error);
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    console.error(error);
    return Promise.reject(error);
  }
);

export default instance;

import axios from "axios";

const instance = axios.create({
  baseURL: "https://www.freedom-day.site/api/",
  // baseURL: "http://localhost:8080/api/",
  timeout: 2000,
  headers: {
    "Content-Type": "application/json",
  },
});

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
    const { code, message, responseData } = response.data;

    return Promise.resolve({
      code,
      message,
      responseData,
    });
  },
  async (error) => {
    console.error(error.response.data);
    const { code, message, response } = error.response.data;

    // accessToken 만료 TODO)
    if (code === "test") {
      // 재발급 요청
      // refreshToekn 만료되었을 경우 처리
    }

    return Promise.reject({
      code,
      message,
      response,
    });
  }
);

export default instance;

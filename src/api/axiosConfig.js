import axios from "axios";
import router from "@/router";

const instance = axios.create({
  baseURL: "https://www.freedom-day.site/api/",
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
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
  (apiResponse) => {
    const { code, message, response } = apiResponse.data;

    return Promise.resolve({
      code,
      message,
      response,
    });
  },
  async (error) => {
    console.error(error);
    console.error(error.response.data);
    const { code, message, response } = error.response.data;

    // 토근 만료
    if (code.indexOf("JWT") === 0) {
      router.push("/");
    }

    return Promise.reject({
      code,
      message,
      response,
    });
  }
);

export default instance;

import axios from "./axiosConfig.js";

async function getTest() {
  return axios.get("test");
}

export { getTest };

import axios from "./axiosConfig.js";

async function getTest() {
  axios.get("test");
}

export { getTest };

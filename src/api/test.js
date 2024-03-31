import axios from "./axiosConfig.js";

async function getTest() {
  return axios.get("/test");
}

async function getGraph() {
  return axios.get("/test/graph1");
}

export { getTest, getGraph };

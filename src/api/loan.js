import axios from "./axiosConfig.js";

async function getUserLoanInfo() {
  return axios.get("/loan/user-loan-info");
}

async function postLoanCreate(param){
  return axios.post("/loan/create", param);
}

export { getUserLoanInfo, postLoanCreate };

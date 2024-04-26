import axios from "./axiosConfig.js";

async function getUserLoanInfo() {
  return axios.get("/loan/user-loan-info");
}

export { getUserLoanInfo };

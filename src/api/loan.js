import axios from "./axiosConfig.js";

async function getUserLoanInfo() {
  return axios.get("/loan/user-loan-info");
}

async function postLoanCreate(param) {
  return axios.post("/loan/create", param);
}

async function getLoanStatistics() {
  return axios.get("/loan/loan-statistics");
}

async function getLoanDetails(param) {
  return axios.get("/loan/detail", {
    params: {
      loanId: param,
    },
  });
}

async function setAddRepaymentDetails(param){
  return axios.post('/loan/add-repayment-details', param);
}

export { getUserLoanInfo, postLoanCreate, getLoanStatistics, getLoanDetails, setAddRepaymentDetails };

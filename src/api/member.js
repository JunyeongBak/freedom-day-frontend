import axios from "./axiosConfig.js";

async function postSignIn(param) {
  return axios.post("/member/sign-in", param);
}

async function postSignUp(param) {
  return axios.post("/member/sign-up", param);
}

async function postAuthenticateEmail(param) {
  return axios.post("/member/send-email");
}

export { postSignIn, postSignUp, postAuthenticateEmail };

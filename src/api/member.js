import axios from "./axiosConfig.js";

async function postSignIn(param) {
  return axios.post("/member/sign-in", param);
}

async function postSignUp() {
  return axios.post("/member/sign-up", param);
}

export { postSignIn, postSignUp };

import axios from "axios";

const serverApi = process.env.REACT_APP_SERVER_API;
const apiContext = process.env.REACT_APP_API_CONTEXT;
const getNonceService = process.env.REACT_APP_GET_NONCE_SERVICE;
const loginService = process.env.REACT_APP_LOGIN_SERVICE;
const logoutService = process.env.REACT_APP_LOGOUT_SERVICE;

const getNonce = async (data) => {
  return await axios.post(`${serverApi}${apiContext}${getNonceService}`, data);
};

const login = async (data) => {
  return await axios.post(`${serverApi}${apiContext}${loginService}`, data);
};

const logout = async (data) => {
  return await axios.post(`${serverApi}${apiContext}${logoutService}`, data);
};

export { getNonce, login, logout };

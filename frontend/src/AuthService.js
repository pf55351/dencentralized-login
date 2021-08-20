import axios from "axios";

const serverApi = process.env.REACT_APP_SERVER_API;
const apiContext = process.env.REACT_APP_API_CONTEXT;
const getNonceService = process.env.REACT_APP_GET_NONCE_SERVICE;
const loginService = process.env.REACT_APP_LOGIN_SERVICE;

const getNonce = async (data) => {
  return await axios.post(
    `${serverApi}:8080${apiContext}${getNonceService}`,
    data
  );
};

const login = async (data) => {
  return await axios.post(
    `${serverApi}:8080${apiContext}${loginService}`,
    data
  );
};

export { getNonce, login };

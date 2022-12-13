import axios from "axios";

const serverApi = process.env.REACT_APP_SERVER_API_URL;
const getNonceService = process.env.REACT_APP_GET_NONCE_SERVICE;
const loginService = process.env.REACT_APP_LOGIN_SERVICE;
const logoutService = process.env.REACT_APP_LOGOUT_SERVICE;

const getNonce = async (_data) => {
  try {
    return await axios.post(`${serverApi}${getNonceService}`, _data);
  } catch (_err) {
    console.error(_err.message);
  }
};

const login = async (data) =>
  await axios.post(`${serverApi}${loginService}`, data);

const logout = async (data) =>
  await axios.post(`${serverApi}${logoutService}`, data);

export { getNonce, login, logout };

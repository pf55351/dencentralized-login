const userExists = require("../mongo_model/usersModel");
const web3 = require("web3");
const messages = require("../messages");

const getNonce = async (address) => {
  let res = {};
  const isEthAddress = web3.utils.isAddress(address);
  if (isEthAddress) {
    const nonce = await userExists(address);
    res.status = 200;
    res.nonce = nonce;
    res.welcomeMsg = messages.WELCOME_MSG;
  } else {
    res.status = 400;
    res.message = messages.ERROR_ADDRESS;
  }
  return res;
};

const verifySign = async (sign, nonce, msg) => {
  let res = {};
  res.status = 200;
  res.message = messages.LOGIN_SUCCESS;
  return res;
};

module.exports = { getNonce, verifySign };

const { insertOrUpdateUserStatus } = require("../mongo_model/usersModel");
const web3 = require("web3");
const ethUtil = require("eth-sig-util");
const messages = require("../messages");
const { v4: uuidv4 } = require("uuid");
const {get,set} = require("../redis");

const getNonce = async (address) => {
  let res = {};
  const isEthAddress = web3.utils.isAddress(address);
  if (isEthAddress) {
    const nonce = uuidv4();
    await set(nonce, address);
    res.status = 200;
    res.nonce = nonce;
    res.welcomeMsg = messages.WELCOME_MSG;
  } else {
    res.status = 400;
    res.message = messages.ERROR_ADDRESS;
  }
  return res;
};

const verifySign = async (sig, nonce, msg) => {
  let res = {};
  const msgParams = {
    data: web3.utils.utf8ToHex(msg),
    sig,
  };
  const addressSigner = ethUtil.recoverPersonalSignature(msgParams);
  const address = await get(nonce);
  if (address.toLowerCase() === addressSigner.toLowerCase()) {
    await insertOrUpdateUserStatus(address, true);
    res.status = 200;
    res.message = messages.LOGIN_SUCCESS;
  } else {
    res.status = 400;
    res.message = messages.LOGIN_ERROR;
  }
  return res;
};

const logout = async (address) => {
  try {
    await insertOrUpdateUserStatus(address, false);
    return { status: 200 };
  } catch (_err) {
    console.error(_err);
  }
};

module.exports = { getNonce, verifySign, logout };

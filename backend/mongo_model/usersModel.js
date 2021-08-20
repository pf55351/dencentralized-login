const moongose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const usersSchema = require("../mongo_schema/userSchema");

const userModel = moongose.model("User", usersSchema);

const insertNewUser = async (address) => {
  if (res) {
    const nonce = generateNonce();
    userModel.create({ address, nonce }, function (err, user) {
      if (err) console.log(err);
      else {
        console.log("user insert ok", user);
        return user.nonce;
      }
    });
  }
};

const userExists = async (address) => {
  let nonce = "";
  const user = await userModel.findOne({ address });
  if (user) {
    console.log("Update Nonce");
    nonce = await updateNonce(user.address);
  } else {
    console.log("Insert New User");
    nonce = await insertNewUser(address);
  }
  return nonce;
};

const updateNonce = async (address) => {
  const filter = { address };
  const update = { nonce: generateNonce(), dataUpdate: Date.now() };
  const user = await userModel.findOneAndUpdate(filter, update);
  return user.nonce;
};

const generateNonce = () => uuidv4();

module.exports = userExists;

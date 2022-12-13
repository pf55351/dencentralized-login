const moongose = require("mongoose");
const usersSchema = require("../mongo_schema/userSchema");

const userModel = moongose.model("User", usersSchema);

const insertOrUpdateUserStatus = async (address, type) => {
  try {
    const user = await userModel.findOne({ address });
    if (user) {
      const filter = { address };
      const update = { userConnected: type, dataUpdate: Date.now() };
      await userModel.findOneAndUpdate(filter, update);
    } else {
      const user = await userModel.create({ address, userConnected: type });
    }
  } catch (_err) {
    console.log(_err);
  }
};

module.exports = { insertOrUpdateUserStatus };

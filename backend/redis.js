const { createClient } = require("redis");

const redisClient = createClient({
  socket: {
    port: 6379,
    host: "redis",
  },
});

redisClient.on("error", (err) => console.log("Redis Client Error", err));

redisClient.connect();

const set = async (_key, _value) => {
  try {
    await redisClient.set(_key, _value);
  } catch (_err) {
    console.log(_err);
  }
};

const get = async (_key, _value) => {
  try {
    return await redisClient.get(_key);
  } catch (_err) {
    console.log(_err);
  }
};

module.exports = { get, set };

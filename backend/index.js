require("./mongo");
require("dotenv").config();
const {getNonce,verifySign} = require("./services/authService");
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.SERVER_PORT;


app.use(express.json());
app.use(cors());
app.post("/api/v1/getNonce", (req, res) => {
  const { address } = req.body;
  getNonce(address).then((r) => res.status(r.status).json(r));
});

app.post("/api/v1/login", (req, res) => {
  const{sign,nonce,msg }=req;
  verifySign(sign,nonce,msg).then(r=>res.status(r.status).json(r))
});

app.all("*", (req, res) => {
  const resp = { status: 404, message: "Unauthorized" };
  res.status(404).json(resp);
});

app.listen(port, () => {
  console.log(`Example app listening at port:${port}`);
});

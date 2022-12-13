require("./mongo");
require("dotenv").config();
const { getNonce, verifySign, logout } = require("./services/authService");
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());

app.post("/getNonce", (req, res) => {
  const { address } = req.body;
  getNonce(address).then((r) => res.status(r.status).json(r));
});

app.post("/login", (req, res) => {
  const { res: sign, nonce, msg } = req.body;
  verifySign(sign, nonce, msg).then((r) => res.status(r.status).json(r));
});

app.post("/logout", (req, res) => {
  const { address } = req.body;
  logout( address ).then((r) => res.status(r.status).json(r));
});

app.all("*", (req, res) => {
  const resp = { status: 404, message: "Unauthorized" };
  res.status(404).json(resp);
});

app.listen(port||8000, () => {
  console.log(`Example app listening at port:${port}`);
});

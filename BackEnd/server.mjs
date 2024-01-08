import express from "express";
import dataBase from "./constants/userdb.mjs";
import cors from "cors";

const port = 3000;

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/v1/users", (req, res) => {
  const { username, password } = req.query;

  if (!username || !password) res.sendStatus(400);

  const userInfo = dataBase.users.find(
    (user) => user.username == username && user.password === password
  );
  if (!userInfo) res.sendStatus(404);
  res.status(200).send(userInfo);
});

app.listen(port, () => {
  console.log(` Runing on port : ${port}`);
});
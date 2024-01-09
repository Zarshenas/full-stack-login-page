import express from "express";
import dataBase from "./constants/userdb.mjs";
import mongoose from "mongoose";
import cors from "cors";
import { User } from "./database/schemas/user.mjs";

const port = 3000;
const url = "mongodb://127.0.0.1:27017/logindb";
mongoose
  .connect(url)
  .then(() => console.log("Connected to the DB"))
  .catch((err) => console.log(`Error : ${err}`));

// const User = mongoose.model('user', { name: String });

// const newUser = new User({ name: 'Ali' });
// const user = await User.find({name:"Ali"}).exec()
// console.log(user)
// newUser.save().then(() => console.log('user saved'));

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/v1/users", async(req, res) => {
  const { username, password } = req.query;

  if (!username || !password) res.sendStatus(400);
  const user = await User.findOne({username , password}).exec()
  // console.log(users)
  // const userInfo = dataBase.users.find(
  //   (user) => user.username == username && user.password === password
  // );
  if (user === null) res.sendStatus(404);
  res.status(200).send(user);
});
//just use postman or whatever to post some user :)
app.post('/api/v1/users' , async(req , res) => {
  const {body} = req;
  const newUser = new User(body)
  try {
    const savedUser = await newUser.save()
    return res.status(201).send(savedUser);
  } catch (error) {
    return res.sendStatus(400)
  }
})

app.listen(port, () => {
  console.log(` Runing on port : ${port}`);
});

const http = require("http");
const url = require("node:url");
const fs = require("node:fs");
const dataBase = {
  users: [
    { id: 1, name: "ali", password: "e_@ggd" },
    { id: 2, name: "reza", password: "12ws$#f" },
    { id: 3, name: "ahmed", password: "shmrd#%%%321" },
  ],
};

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin","*")

  const parsedURL = url.parse(req.url, true);

  if (parsedURL.pathname === "/api/v1/users") {
    if(!parsedURL.query.username){
      res.write(JSON.stringify(dataBase.users));
    }else{
      const username = dataBase.users.find(
        (user) => user.name.toLowerCase() === parsedURL.query.username.toLowerCase()
      );
      const pass = dataBase.users.find(
        (user) => user.password === parsedURL.query.password
      );
      if (username && pass) {
        res.write(JSON.stringify(username));
      } else if (username && !pass) {
        res.write(JSON.stringify({error:"wrong password"}));
      } else {
        res.write(JSON.stringify(null));
      }
    }
  }
  res.end();
});

server.listen(3000);

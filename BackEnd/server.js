const http = require("http");
const url = require("node:url");

const {userDB} = require('./constants/userdb');

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin","*")
  
  const parsedURL = url.parse(req.url, true);
  
  if (parsedURL.pathname === "/api/v1/users") {
    if(!parsedURL.query.username){
      res.write(JSON.stringify(userDB.users));
    }else{
      const username = userDB.users.find(
        (user) => user.name.toLowerCase() === parsedURL.query.username.toLowerCase()
      );
      const pass = userDB.users.find(
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

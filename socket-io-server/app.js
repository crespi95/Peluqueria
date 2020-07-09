const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const Mysql =require("mysql");
const mariadb = require('mariadb');
const md5 = require('md5');
const connection =  mariadb.createPool({host: 'localhost', user: 'root', password: '12345', database: "peluqueria",});
/*
const connection = Mysql.createConnection({
    host: "localhost",
    user: "Admin",
    pass: "1234",
    database: "peluqueria",

});*/


const port = process.env.PORT || 4002;
const index = require("./routes/index");

const app = express();
app.use(index);

const server = http.createServer(app);

const io = socketIo(server);

let interval;

io.on("connection", (socket) => {
  console.log(socket.client.id);
 
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
    socket.on("register", (user) => {
      console.log(user)
    let sql = "INSERT INTO usuarios (cod_usuario, user, pass) VALUES (NULL, '"+user[0]+"', MD5('"+user[1]+"'))";
    connection.query(sql);
  });

  socket.on("login",(user)=>{
     let sql = "SELECT * from usuarios;";
     
    connection.query(sql).then((result)=>{
      for (let i of result) {  
       console.log(md5(user[1]));
        if(i.user==user[0] && i.pass == md5(user[1])){
          
          socket.emit("login",user[0]);
        }
     }
     }).catch((err)=>{
       console.log(err)
     });
      
     
       
     
  })

});


server.listen(port, () => console.log(`Listening on port ${port}`));
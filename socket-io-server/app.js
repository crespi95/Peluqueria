const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const Mysql =require("mysql");

const connection = Mysql.createConnection({
    host: "localhost",
    user: "Admin",
    pass: "1234",
    database: "peluqueria",

});


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
    let sql = "INSERT INTO usuarios (cod_usuario, user, pass) VALUES (NULL, '"+user[0]+"', '"+user[1]+"')";
    connection.query(sql);
  });

  socket.on("login",(user)=>{
     let sql = "SELECT * from usuarios";
     connection.query(sql,(err,result)=>{
       for (let i of result) {

          if(i.user==user[0] && i.pass == user[1]){
        
            socket.emit("login",user[0]);
          }
       }
     });
  })

});


server.listen(port, () => console.log(`Listening on port ${port}`));
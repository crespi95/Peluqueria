const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const Mysql =require("mysql");
const mariadb = require('mariadb');    
const md5 = require('md5');
//const connection =  mariadb.createPool({host: 'localhost', user: 'root', password: '12345', database: "peluqueria",});

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

 
  socket.on("disconnect", () => {
    console.log("Client disconnected");

  });
    socket.on("register", (user) => {
      let name = user[0];
      let contador = 0;
      let codU;
      let sql = "SELECT * FROM usuarios";

      connection.query(sql).then((result)=>{
        for (let i of result) {
          
        
          if(i.user == name){
            contador++;
            console.log(contador);
          }
        }
        if(contador==0){
        let sql = "INSERT INTO usuarios (cod_usuario, user, pass, cod_rol, borrado) VALUES (NULL, '"+user[0]+"', MD5('"+user[1]+"'),0,0)";
        connection.query(sql);
        let c1 = "SELECT * from usuarios WHERE user = '"+ user[0]+"';";
       connection.query(c1).then((result)=>{
      for (let i of result) {
            console.log(i.cod_usuario);
            if(i.user == user[0]){
              codU = i.cod_usuario;
              sql ="INSERT INTO `datos` (`cod_dato`, `cod_usuario`, `nombre`) VALUES (NULL, '"+codU+"', '"+user[2]+"');"
              connection.query(sql);
            }
          }
     }).catch((err)=>{
       console.log(err)
     });
       } else{socket.emit("validacion","Usuario en uso");
      }
       }).catch((err)=>{
         console.log(err)
       });
     /* connection.query(sql,(err,result) =>{
        for (let i of result) {
          
        
          if(i.user == name){
            contador++;
            console.log(contador);
          }
        }
        if(contador==0){
        let sql = "INSERT INTO usuarios (cod_usuario, user, pass, cod_rol, borrado) VALUES (NULL, '"+user[0]+"', MD5('"+user[1]+"'),0,0)";
        connection.query(sql);
        let c1 = "SELECT * from usuarios WHERE user = '"+ user[0]+"';";
       
        connection.query(c1,(err,result)=>{
          for (let i of result) {
            console.log(i.cod_usuario);
            if(i.user == user[0]){
              codU = i.cod_usuario;
              sql ="INSERT INTO `datos` (`cod_dato`, `cod_usuario`, `nombre`) VALUES (NULL, '"+codU+"', '"+user[2]+"');"
              connection.query(sql);
            }
          }
        })
        
       
        }else{
          socket.emit("validacion","Usuario en uso");
     
    }
        
      });*/
     
  });

  socket.on("login",(user)=>{
     let sql = "SELECT * from usuarios;";
     
    /* connection.query(sql,(err,result)=>{
      for (let i of result) {  
        console.log(md5(user[1]));
         if(i.user==user[0] && i.pass == md5(user[1])){    
           
           socket.emit("login",user[0]);
         }
        }
     })*/


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
      
     
       
     
  });
  socket.on("fecha",(data)=>{
    let horario = [
      "09:00:00","09:30:00","10:00:00","10:30:00","11:00:00","11:30:00","12:00:00","12:30:00","13:00:00","13:30:00","14:00:00","14:30:00",
  ];
 
    const citas =[];  
  let sql ="SELECT * FROM citas"
  connection.query(sql).then((result)=>{
    for (let i of result) {
      
      var mnths = {
        Jan: "01",
        Feb: "02",
        Mar: "03",
        Apr: "04",
        May: "05",
        Jun: "06",
        Jul: "07",
        Aug: "08",
        Sep: "09",
        Oct: "10",
        Nov: "11",
        Dec: "12"
      };

      let aux = i.fecha_hora+"";
      let str = aux.split(" ");
      let mes = mnths[str[1]];
      let ano = str[3];
      let dia = str[2];
      let fecha = ano+"-"+mes+"-"+dia;
      
      if(fecha == data){
        citas.push(str[4])
      }
     }
     for (let i in citas) {
      for (let o in horario) {
        
      
      if(citas[i]==horario[o]){
        horario.splice(o,1);
      }
      }
    }
    console.log(horario);

      socket.emit("horario",horario)
   }).catch((err)=>{
     console.log(err)
   });
    /*connection.query(sql,(err, result)=>{
      
    

     for (let i of result) {
      
      var mnths = {
        Jan: "01",
        Feb: "02",
        Mar: "03",
        Apr: "04",
        May: "05",
        Jun: "06",
        Jul: "07",
        Aug: "08",
        Sep: "09",
        Oct: "10",
        Nov: "11",
        Dec: "12"
      };

      let aux = i.fecha_hora+"";
      let str = aux.split(" ");
      let mes = mnths[str[1]];
      let ano = str[3];
      let dia = str[2];
      let fecha = ano+"-"+mes+"-"+dia;
      
      if(fecha == data){
        citas.push(str[4])
      }
     }
     for (let i in citas) {
      for (let o in horario) {
        
      
      if(citas[i]==horario[o]){
        horario.splice(o,1);
      }
      }
    }
    console.log(horario);

      socket.emit("horario",horario)
    }) 
  })*/
  socket.on("createCita",(data)=>{
    let date = data[0];
    let user = data[1];
    let contador =0;
    let sql = "SELECT * FROM citas WHERE fecha_hora='"+date+"';";
    connection.query(sql).then((result)=>{
     for(let i of result){
        if(i.fecha_hora==date){
          contador++;
        }

      }
      if(contador!=0){
        socket.emit("validacion","Fecha no disponible");
      }else{
        sql= "SELECT * FROM usuarios where user='"+user+"'";
       
          connection.query(sql).then((result)=>{
            user=result[0].cod_usuario;
          sql="INSERT INTO `citas` (`cod_cita`, `fecha_hora`, `cod_usuario`) VALUES (NULL, '"+date+"', '"+user+"');"
        connection.query(sql);

             connection.query(sql);
           }).catch((err)=>{
             console.log(err)
           });
      
        
        
      }
     }
     ).catch((err)=>{
       console.log(err)
     });
   /* connection.query(sql,(err,result)=>{
      for(let i of result){
        if(i.fecha_hora==date){
          contador++;
        }

      }
      if(contador!=0){
        socket.emit("validacion","Fecha no disponible");
      }else{
        sql= "SELECT * FROM usuarios where user='"+user+"'";
        connection.query(sql,(err,result)=>{
          user=result[0].cod_usuario;
          sql="INSERT INTO `citas` (`cod_cita`, `fecha_hora`, `cod_usuario`) VALUES (NULL, '"+date+"', '"+user+"');"
        connection.query(sql);
        })
        
      }
    })*/
  })

});


server.listen(port, () => console.log(`Listening on port ${port}`));
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const Mysql =require("mysql");
const mariadb = require('mariadb');    
const md5 = require('md5');
const connection =  mariadb.createPool({host: 'localhost', user: 'root', password: '12345', database: "peluqueria",});
var nodemailer = require('nodemailer'); // email sender function
 exports.sendEmail = function(req, res){
  // nodemailer stuff will go here
};
const transporter = nodemailer.createTransport({
  service: 'Hotmail',
  auth: {
      user: 'xxxxxx@hotmail.com',
      pass: 'xxxxxx'
  }
});
/*
const connection = Mysql.createConnection({
    host: "localhost",
    user: "Admin",
    pass: "1234",
    database: "peluqueria",

}); 
*/

const port = process.env.PORT || 4002;
const index = require("./routes/index");
const conexiones = [];
const app = express();
app.use(index);

const server = http.createServer(app);

const io = socketIo(server);

let interval;

io.on("connection", (socket) => {

 
  socket.on("disconnect", () => {


  });
    socket.on("register", (user) => {
      let name = user[0];
      let contador = 0;
      let codU;
      let sql = "SELECT * FROM usuarios;";

      connection.query(sql).then((result)=>{
        for (let i of result) {
          
        
          if(i.user == name){
            contador++;
        
          
          }
        }
        if(contador==0){
        let sql = "INSERT INTO usuarios (cod_usuario, user, pass, cod_rol, borrado) VALUES (NULL, '"+user[0]+"', MD5('"+user[1]+"'),0,0);";
        connection.query(sql);
        let c1 = "SELECT * from usuarios WHERE user = '"+ user[0]+"';";
       connection.query(c1).then((result)=>{
      for (let i of result) {
          
            if(i.user == user[0]){
              codU = i.cod_usuario;
              sql ="INSERT INTO `datos` (`cod_dato`, `cod_usuario`, `nombre`) VALUES (NULL, '"+codU+"', '"+user[2]+"');"
              connection.query(sql);
            }
          }
     }).catch((err)=>{

     });
       } else{socket.emit("validacion","Usuario en uso");
      }
       }).catch((err)=>{
   
       });
     
     
  });

  socket.on("login",(user)=>{
     let sql = "SELECT * from usuarios;";


    connection.query(sql).then((result)=>{
      let hora = new Date();
      for (let i of result) {  
  
        if(i.user==user[0] && i.pass == md5(user[1])){
          conexiones.push({name:i.user,login:true,time:hora.getTime()+1*10*1000+3600*1000*2});
          hora.setTime(hora.getTime()+15*60*1000+3600*1000*2);
          console.log(hora.toUTCString());
          socket.emit("login",user[0]);
        }
     }
     }).catch((err)=>{

     });
      
     
       
     
  });
  socket.on("refresco",(user)=>{
    let hora = new Date();
   

    for (let i in conexiones) {
      if(conexiones[i].name==user){

 
        let time = new Date();
        hora.setTime( time.getTime()+(2*1000*3600));
        console.log(hora.toUTCString());

     
        if(conexiones[i].time>hora.getTime() && conexiones[i].login==true){
          conexiones[i].time = time.getTime()+(1*10*60*1000+3600*1000*2);
          socket.emit("refresh", conexiones[i]);
         
        }
        else{
          conexiones[i].login = false;
          socket.emit("refresh", conexiones[i])
          conexiones.splice(i,1);
          
        }
      
      }
    }
  });
  socket.on("delete",usu=>{
    console.log(conexiones)
    for (let i in conexiones) {
      if(conexiones[i].name==usu){
      conexiones.splice(i,1);
      }
    }
    console.log(conexiones)


  })


  socket.on("fecha",(data)=>{
    let horario = [ 
      "09:00:00","09:30:00","10:00:00","10:30:00","11:00:00","11:30:00","12:00:00","12:30:00","13:00:00","13:30:00","14:00:00","14:30:00",
  ];
 
    
  let sql ="SELECT * FROM citas"
  connection.query(sql).then((result)=>{
    const citas =[];  
    const date = new Date();
    
   
    const fecha2 = new Date(data);
  
  
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
    if(date>fecha2){
      socket.emit("horario","")
    }
    else{

      socket.emit("horario",horario)
    }
   }).catch((err)=>{

   });
  })
  
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
        
           });
      
        
        
      }
     }
     ).catch((err)=>{
 
     });
    });

  
  socket.on("list", (user)=>{
   
    let sql = "select cod_usuario from usuarios where user='"+user+"';";
    connection.query(sql).then((result)=>{
 
      sql = "SELECT fecha_hora, cod_cita  FROM citas where cod_usuario="+result[0].cod_usuario+";";
      connection.query(sql).then((result)=>{
 
        socket.emit("listres",result);
      }).catch(err=>{
 
      })

    }).catch(err=>{

    });

    });
  
  socket.on("borrado",(cod)=>{
    sql= "DELETE FROM  citas  WHERE  cod_cita="+cod+";";

    connection.query(sql);
  })
  socket.on("enviarMail", datos =>{

    var mailOptions = {
      from: "peluqueriaprueba3@hotmail.com",
      to: 'ricardo1.cresro@gmail.com',
      subject: datos[0],
      text: datos[1]
    };

      transporter.sendMail(mailOptions, function(error, info){
        if (error){
          console.log(info);
          console.log("-------------");
          console.log(error);
           
        } else {
            console.log("Email sent");
           
        }
    });
  })
    
  

});

server.listen(port, () => console.log(`Listening on port ${port}`));

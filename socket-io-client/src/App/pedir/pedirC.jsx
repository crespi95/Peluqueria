import React, { useState } from "react";
import Cita from "../components/cita";
import socketIOClient from "socket.io-client";
import "bootstrap/dist/css/bootstrap.min.css"
const ENDPOINT = "http://51.210.108.3:4002";

const socket = socketIOClient(ENDPOINT); 



const PedirC = () => {
  
  function cita (){
    var login = true;
        if(document.cookie){
      
     
      
      let cookie = document.cookie.split(",");
      let usu = cookie[0].split(";")[0].split("=")[1];
     
     
      socket.emit("refresco",usu);
      socket.on("refresh", usu=>{
    
        document.cookie= "usuario="+usu.name;
        document.cookie= "login="+usu.login;
        login = usu.login;
      
      })
     
     
  }else{
     login = false;
     window.location.href = "/login"
  }
  if(login){
    return  <Cita />;
  }
}

    return(
      <> <div className="row">
      <div className="col-4"></div>
   <div className="col-4"> 
     
     {cita()}
     </div>
     </div>
  </>
    )}
export default PedirC;

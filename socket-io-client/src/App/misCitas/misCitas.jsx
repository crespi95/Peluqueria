import React from "react";
import socketIOClient from "socket.io-client";
import Listado from "../components/listado";
import "bootstrap/dist/css/bootstrap.min.css"
const ENDPOINT = "http://51.210.108.3:4002";

const socket = socketIOClient(ENDPOINT); 



const PedirC = () => {
  
  function listado(){
    let login = true;
    if(document.cookie){
      login = false;

    }
    else{
      login = true;
      window.location.href = "/login"
    }
    if(!login){
      return <Listado />
    }
  }

    return(
      <> <br></br>
      <div className="row">
       <div className="col-4"></div>
    <div className="col-3"> 
      
      {listado()}
      </div>
      </div>
      <div className="col-4"></div>
      
  </>
    )}
export default PedirC;

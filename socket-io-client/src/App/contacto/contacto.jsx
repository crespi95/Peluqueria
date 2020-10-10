import React from "react";
import socketIOClient from "socket.io-client";
import Contact from "../components/contacto"
import "bootstrap/dist/css/bootstrap.min.css"
const ENDPOINT = "http://51.210.108.3:4002";

const socket = socketIOClient(ENDPOINT); 



const Contacto = () => {



    return(
      <>
      
      
      <Contact />
  
  </>
    )}
export default Contacto;

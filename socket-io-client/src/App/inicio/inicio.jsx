import React, { useState } from "react";
import Registro from "../components/registro";
import Usuarios from "../components/usuarios";
import Login from "../components/login";
import Pulsador from "../components/pulsador";
import Cita from "../components/cita";
import socketIOClient from "socket.io-client";
import Listado from "../components/listado";
import "bootstrap/dist/css/bootstrap.min.css"
import precio from "../imagenes/precio.jpg";
const ENDPOINT = "http://51.210.108.3:4002";

const socket = socketIOClient(ENDPOINT); 

const usuarios = [
    {name:"Ricardo", pass:"1234"},
    {name:"Pedro", pass:"3124"}
];


const Inicio = () => {

    const [user, setUsers] = useState(usuarios);
  
  



    return(
    <div>
      <br></br>

      <div className="row" >
      <div className="col-2"></div>
      <p className="col-3" style={{fontSize:"24px"}}>

      Lorem ipsum dolor sit amet consectetur adipiscing elit habitant semper, vehicula ullamcorper gravida nec lacinia viverra commodo. Facilisis sodales nisl interdum at phasellus sagittis neque purus eros proin, parturient vehicula dictum risus sociis pretium montes fringilla convallis, fermentum suscipit aliquam commodo malesuada habitasse enim nec felis. In vel rutrum hac nam interdum dignissim ullamcorper augue, pulvinar dis euismod parturient commodo senectus curae molestie morbi, neque congue quam odio mauris tempus vulputate.
      </p>
      <div className="col-1"></div>
      
      <img src={precio}  className="col-4" height="80%"></img>
     
      <div className="col-2"></div>
      </div>
       
        
         
       
  
      <div className="row">
        <div className="col-11"></div>
  
      </div>
   
      
      </div>
      

    )}
export default Inicio;

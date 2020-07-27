import React, { useState } from "react";
import Registro from "../components/registro";
import Usuarios from "../components/usuarios";
import Login from "../components/login";
import Pulsador from "../components/pulsador";
import Cita from "../components/cita";


const usuarios = [
    {name:"Ricardo", pass:"1234"},
    {name:"Pedro", pass:"3124"}
];


const Inicio = () => {

    const [user, setUsers] = useState(usuarios);
   
    return(
    <div>
        <h2>Registro</h2>
      <Registro onNewUser={newUser => setUsers([ newUser, ...user])} />
       <br></br>
       <br></br>
       <h2>Login</h2>
      <Login  />
      <br></br>
       <br></br>
       <h2>Cita</h2>
        <Cita></Cita>
      <Pulsador />
        </div>
    
    )}
export default Inicio;

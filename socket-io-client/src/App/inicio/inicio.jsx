import React, { useState } from "react";
import Registro from "../components/registro";
import Usuarios from "../components/usuarios";
import Login from "../components/login";
import Pulsador from "../components/pulsador";


const usuarios = [
    {name:"Ricardo", pass:"1234"},
    {name:"Pedro", pass:"3124"}
];


const Inicio = () => {

    const [user, setUsers] = useState(usuarios);
   
    return(
    <div>
      <Registro onNewUser={newUser => setUsers([ newUser, ...user])} />
       
      <Usuarios users={user} /><br></br>
      <Login  />
        
      <Pulsador />
        </div>
    
    )}
export default Inicio;

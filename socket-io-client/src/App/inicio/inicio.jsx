import React, { useState } from "react";
import Registro from "./registro/Registro";
import Usuarios from "./usuarios";
import Login from "../login/login";


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
        </div>
    
    )}
export default Inicio;

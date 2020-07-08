import React, { useState } from "react";
import Login from "../components/login";



const usuarios = [
    {name:"Ricardo", pass:"1234"},
    {name:"Pedro", pass:"3124"}
];


const Inicio = () => {

    const [user, setUsers] = useState(usuarios);
   
    return(
    <div>
     
      <Login  />
        </div>
    
    )}
export default Inicio;

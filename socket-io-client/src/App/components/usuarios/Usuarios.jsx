import React from "react";
import PropType from "prop-types"

const Usuarios = ({users}) =>{

    return(
        
    <ul>
    {users.map(({name,pass})=>(
        
        <li>usuario:{name}, contraseña:{pass}</li>
     
    ))}

</ul>

    )};

Usuarios.propTypes ={
    users: PropType.arrayOf(PropType.shape({
        name: PropType.string,
        pass: PropType.string
    }))
};

Usuarios.defaultProps ={
    usuarios:[],
};
export default Usuarios;
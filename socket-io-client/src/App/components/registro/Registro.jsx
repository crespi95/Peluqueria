import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://51.210.108.3:4002";

const socket = socketIOClient(ENDPOINT);


const Registro = ({onNewUser})=>{
    const [newName, setNewName] = useState("");
    const [newPass, setNewPass] = useState("");
  return(
 <>
    <label>Name:</label>
    <input type="text" value={newName} onChange={e=>setNewName(e.target.value) } onKeyUp={e=>{
        if(e.key == "Enter" && newName!="" && newPass!="") {
        onNewUser({
            name: newName,
            pass: newPass,
        });
        let user = [newName,newPass];
       
        socket.emit("register", user);

        setNewPass("");
        setNewName("");
        }
    }}></input><br></br>
    <label>Pass:</label>
    <input type="password" value={newPass} onChange={e=>setNewPass(e.target.value)} onKeyUp={e=>{
        if(e.key == "Enter" && newName!="" && newPass!="") {
        onNewUser({
            name: newName,
            pass: newPass,
        });
        let user = [newName,newPass];
       
        socket.emit("register", user);

        setNewPass("");
        setNewName("");
        }
    }}></input><br></br>
    <button onClick={()=>{
        onNewUser({
            name: newName,
            pass: newPass,
        });
        
        let user = [newName,newPass];
       
        socket.emit("register", user);

        setNewPass("");
        setNewName("");
    }
    } >Enviar</button>
    <br></br>
    </>
  )}

Registro.propTypes = {
    onNewUser: PropTypes.func,
}

Registro.defaultProps ={
    onNewUser:  ()=>{},
}
export default Registro;
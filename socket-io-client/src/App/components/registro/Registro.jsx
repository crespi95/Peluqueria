import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://51.210.108.3:4002";
//const ENDPOINT = "http://localhost:4002/";
const socket = socketIOClient(ENDPOINT);


const Registro = ({onNewUser})=>{
    const [newName, setNewName] = useState("");
    const [newPass, setNewPass] = useState("");
    const [newNick, setNewNick] = useState("");
  return(
 <>
    <label>Nick:</label>
    <input type="text" value={newName} onChange={e=>setNewName(e.target.value) } onKeyUp={e=>{
        if(e.key == "Enter" && newName!="" && newPass!="" && newNick!="") {
        onNewUser({
            name: newName,
            pass: newPass,
            nick: newNick
        });
        let user = [newName,newPass,newNick];
       
        socket.emit("register", user);

        setNewPass("");
        setNewName("");
        setNewNick("");
        }
    }}></input><br></br>
    <label>Pass:</label>
    <input type="password" value={newPass} onChange={e=>setNewPass(e.target.value)} onKeyUp={e=>{
        if(e.key == "Enter" && newName!="" && newPass!="" && newNick!="" ) {
        onNewUser({
            name: newName,
            pass: newPass,            
            nick: newNick
        });
        let user = [newName,newPass,newNick];
       
        socket.emit("register", user);

        setNewPass("");
        setNewName("");
        setNewNick("");
        }
    }}></input><br></br>
     <label>Nombre:</label>
    <input type="text" value={newNick} onChange={e=>setNewNick(e.target.value) } onKeyUp={e=>{
        if(e.key == "Enter" && newName!="" && newPass!="" && newNick!="") {
        onNewUser({
            name: newName,
            pass: newPass,
            nick: newNick
        });
        let user = [newName,newPass,newNick];
       
        socket.emit("register", user);

        setNewPass("");
        setNewName("");
        setNewNick("");
        }
    }}></input><br></br>
    <button onClick={()=>{
        if(newName!="" && newPass!="" && newNick!="" ){
        onNewUser({
            name: newName,
            pass: newPass,
            nick: newNick
        });
        
        let user = [newName,newPass,newNick];
       
        socket.emit("register", user);
        socket.on("validacion",mens =>{
            alert(mens);
        })

        setNewPass("");
        setNewName("");
        setNewNick("");
    }
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
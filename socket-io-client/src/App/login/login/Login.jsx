import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://localhost:4002";

const socket = socketIOClient(ENDPOINT);


const url = "http://localhost/sql/insert.php";

const Login = ({onLogin})=>{
    const [newName, setNewName] = useState("");
    const [newPass, setNewPass] = useState("");
  return(
 <>
    <label>Name:</label>
    <input type="text" value={newName} onChange={e=>setNewName(e.target.value) } onKeyUp={e=>{
        if(e.key == "Enter" && newName!="" && newPass!="") {
            onLogin({
            name: newName,
            pass: newPass,
        });
        var user = [newName,newPass];
        socket.emit("login", user);
        socket.on("login", user=>{
            document.cookie = "usuario="+user;
            document.cookie = "login=true";  
           
        })
        setNewPass("");
        setNewName("");
        }
    }}></input><br></br>
    <label>Pass:</label>
    <input type="password" value={newPass} onChange={e=>setNewPass(e.target.value)} onKeyUp={e=>{
        if(e.key == "Enter" && newName!="" && newPass!="") {
            onLogin({
            name: newName,
            pass: newPass,
        });
        var user = [newName,newPass];
        socket.emit("login", user);
        socket.on("login", user=>{
            document.cookie = "usuario="+user;
            document.cookie = "login=true";  
           
        })
        setNewPass("");
        setNewName("");
        }
    }}></input><br></br>
    <button onClick={()=>{
        onLogin({
            name: newName,
            pass: newPass,
        });
        
        var user = [newName,newPass];
       
        socket.emit("login", user);
        socket.on("login", user=>{
            document.cookie = "usuario="+user;
            document.cookie = "login=true";  
           
        })
        setNewPass("");
        setNewName("");
    }
    } >Enviar</button>
    <br></br>
    </>
  )}

  Login.propTypes = {
    onLogin: PropTypes.func,
}

Login.defaultProps ={
    onLogin:  ()=>{},
}
export default Login;
import React, { useState } from "react";
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
 <><div class="form-group panel panel-default">
 <br></br>
     <h2>Registro</h2>
     
    <label class="col-lg-2 control-label" style={{fontSize:"20px"}}>Nick:</label>
    <input type="text"  value={newName} class="form-control col-5" onChange={e=>setNewName(e.target.value) } onKeyUp={e=>{
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
    <label  class="col-lg-2 control-label" style={{fontSize:"20px"}}>Pass:</label>
    <input type="password" value={newPass} class="form-control col-5"  onChange={e=>setNewPass(e.target.value)} onKeyUp={e=>{
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
        window.location.replace('');
        }
    }}></input>
     <label class="col-lg-2 control-label" style={{fontSize:"20px"}}>Nombre:</label>
    <input type="text" value={newNick}  class="form-control col-5" onChange={e=>setNewNick(e.target.value) } onKeyUp={e=>{
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
        window.location.replace('');
        }
    }}></input><br></br>
    <button style={{marginLeft:"12%"}} onClick={()=>{
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
        window.location.replace('');
    }
}
    } >Registrarse</button>
    <br></br><br></br>
    </div>
    </>
  )}

Registro.propTypes = {
    onNewUser: PropTypes.func,
}

Registro.defaultProps ={
    onNewUser:  ()=>{},
}
export default Registro;
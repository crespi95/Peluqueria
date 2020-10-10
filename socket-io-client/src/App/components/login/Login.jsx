import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://51.210.108.3:4002";
//const ENDPOINT = "http://localhost:4002/";
const socket = socketIOClient(ENDPOINT); 

const Login = ({onLogin})=>{
    const [newName, setNewName] = useState("");
    const [newPass, setNewPass] = useState("");
  return(
 <><div class="form-group panel panel-default">
     <br></br>
      <h2>Login</h2>
      <label class="col-lg-2 control-label" style={{fontSize:"20px"}}>Name:</label>
    <input type="text" value={newName} class="form-control col-5" onChange={e=>setNewName(e.target.value) } onKeyUp={e=>{
        if(e.key == "Enter" && newName!="" && newPass!="") {
            onLogin({
            name: newName,
            pass: newPass,
        });
        var user = [newName,newPass];
        if(!document.cookie){
        socket.emit("login", user);
         }else{
        alert("Ya hay un usuario conectado");
    }
        socket.on("login", user=>{
            if(user){
                document.cookie = "usuario="+user;
                document.cookie = "login=true"; 
                let now = new Date();
                now.setTime(now.getTime()+(10*1000+2*3600*1000));

                console.log(now.toUTCString());
                document.cookie = "expires="+ now.toUTCString()+ "; path=/"; 
                window.location.replace('');
                }else{
                    alert("Usuario no válido");
                }
        })
        alert("Usuario no válido");
        setNewPass("");
        setNewName("");
       
        }
    }}></input><br></br>
     <label class="col-lg-2 control-label" style={{fontSize:"20px"}}>Pass:</label>
    <input type="password" class="form-control col-5" value={newPass} onChange={e=>setNewPass(e.target.value)} onKeyUp={e=>{
        if(e.key == "Enter" && newName!="" && newPass!="") {
            onLogin({
            name: newName,
            pass: newPass,
        });
        var user = [newName,newPass];
        if(!document.cookie){
        socket.emit("login", user);
    }else{
        alert("Ya hay un usuario conectado");
    }
        socket.on("login", user=>{
            if(user){
                document.cookie = "usuario="+user;
                document.cookie = "login=true"; 
                let now = new Date();    
                now.setTime(now.getTime()+(10*1000+2*3600*1000));
          
                console.log(now.toUTCString());
                document.cookie = "expires="+ now.toUTCString()+ "; path=/"; 
                window.location.replace('');
                }else{
                    
                }
        })
        
        setNewPass("");
        setNewName("");
     
        }
       
    }}></input><br></br>
    <button style={{marginLeft:"12%"}} onClick={()=>{
        onLogin({
            name: newName,
            pass: newPass,
        });
  
        var user = [newName,newPass];
        if(!document.cookie){
        socket.emit("login", user);
        }else{
        
        }
        socket.on("login", user=>{
            if(user){
                document.cookie = "usuario="+user;
                document.cookie = "login=true"; 
                let now = new Date();
                now.setTime(now.getTime()+(10*1000+2*3600*1000));
           
                console.log(now.toUTCString());
                document.cookie = "expires="+ now.toUTCString()+ "; path=/"; 
                window.location.replace('');
                }else{
                 
                }
        })
        /*setTimeout(()=>{
        alert("Usuario no válido");
        },1000);*/
        setNewPass("");
        setNewName("");
       
    
    }
    
    } >Conectarse</button>
    <br></br>
    </div>
    </>
  )}

  Login.propTypes = {
    onLogin: PropTypes.func,
}

Login.defaultProps ={
    onLogin:  ()=>{},
}
export default Login;
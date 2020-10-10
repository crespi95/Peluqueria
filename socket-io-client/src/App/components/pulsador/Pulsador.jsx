import React from "react";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://51.210.108.3:4002";
//const ENDPOINT = "http://localhost:4002/";
const socket = socketIOClient(ENDPOINT); 
 const Pulsador = ()=>{

        if(document.cookie){
            console.log(document.cookie)
           let user = document.cookie.split("=")[1].split(";")[0];
            socket.emit("refresco",user);
            
            socket.on("refresh", date=>{
                console.log(date)
              
                if(date.login){
                    document.cookie = "usuario="+date.name;
                    document.cookie = "login=true"; 
                    let expire = new Date();
                    expire.setTime(date.time);
                    document.cookie = "expires="+ expire.toUTCString()+ "; path=/"; 
                }
                else{
                  
                    if(!date.login){
                        let cookie = document.cookie.split(";");
                        for (let i of cookie) {
                            document.cookie= i.split("=")[0]+"=''; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
                        }
                        window.location.replace('');
                     
                    
                }
            }
            })
        return(
        <div style={{textAlign:"right"}}>
           <br></br>
            <button onClick={()=>{
                if(document.cookie){
                   
                    
                    let cookie = document.cookie.split(";");
                    let user = document.cookie.split("=")[1].split(";")[0];
                    socket.emit("delete",user);
                    if(cookie[0].split("=")[1]=="true" || cookie[1].split("=")[1]=="true"){
                        for (let i of cookie) {
                            document.cookie= i.split("=")[0]+"=''; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
                        }
                     
                    }
                }
                window.location.replace('/inicio');
            }}>Desconectar</button>

        </div>)
        }
        else{
            return(<div style={{textAlign:"right"}}>
                 <br></br>
           <a href="/login" style={{fontSize:"30px"}}>Login</a>
           </div>
           );
        }
 }
 

 export default Pulsador;
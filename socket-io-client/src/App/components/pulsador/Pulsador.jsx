import React from "react";

 const Pulsador = ()=>{

        if(document.cookie){
        return(
        <div>
            <button onClick={()=>{
                if(document.cookie){
                    alert(document.cookie)
                    
                    let cookie = document.cookie.split(";");
                    if(cookie[1].split("=")[1]=="true"){
                        for (let i of cookie) {
                            document.cookie= i.split("=")[0]+"=''; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
                        }
                        alert(document.cookie)
                    }
                }
            }}>Desconectar</button>

        </div>)
        }
        else{
            return(<></>);
        }
 }
 

 export default Pulsador;
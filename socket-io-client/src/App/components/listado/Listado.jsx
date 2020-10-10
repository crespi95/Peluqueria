import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://51.210.108.3:4002";
//const ENDPOINT = "http://localhost:4002/";
const socket = socketIOClient(ENDPOINT); 

const Listado = ()=>{
    const [newList,setNewList] = useState([]);
    const [newCod,setNewCod] = useState([]);
    useEffect(()=>{
        if(document.cookie){
            let x = [];
            let y = [];
             
               let cookie = document.cookie.split(",");
               let usu = cookie[0].split(";")[0].split("=")[1];   
               console.log(usu)
               socket.emit("list",usu);
               socket.on("listres", result=>{
                
                  for (let i of result) {

                       x.push(i.fecha_hora.split("T")[0]+" ---> "+i.fecha_hora.split("T")[1].split(".")[0]);
                       y.push(i.cod_cita);
                       
                   }
                   setNewCod(y);
                   setNewList(x);
               })                     
           }
       
    },newList);

    const listnum = newList.map((list,index)=>
  
    
        <tbody key={index}><td style={{ border:" 1px solid black", width: "200px", textAlign:"center"}} >{list}</td><td style={{ border:" 1px solid black", width:"100px",textAlign:"center"}}> <button onClick={()=>{
            
            socket.emit("borrado",newCod[index]);
            window.location.replace('');
        }
        }>Borrar</button></td>
        
        </tbody>
    );
   
    return(
        <><div className="row">
            <div className="col-3"></div>
        <h2 className="text-success">Listado de citas</h2>
        
        <table className="table table-dark" style={{borderCollapse: "collapse"}}>{listnum}
        </table>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br><br></br>
        </div>
        </>
    )


}

export default Listado;
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import socketIOClient from "socket.io-client";
import Select from 'react-select';
const ENDPOINT = "http://51.210.108.3:4002";
//const ENDPOINT = "http://localhost:4002/";
const socket = socketIOClient(ENDPOINT);



const Cita = ({onNewCita})=>{
    const [newDate, setNewDate]= useState("");
    const [newTime, setNewTime]= useState([]);
    const date =[];
    const Hora = "";
  
    return(
        <>
          <br></br>
          <h2>Cita</h2>
          <br></br>
        <label><h4>Fecha: </h4></label><br></br>
       
        <input type="date" value={newDate}  onChange={e=>{
            setNewDate(e.target.value);
            socket.emit("fecha",e.target.value);
            socket.on("horario",datos=>{
                if(datos){
                setNewTime(datos);
                for (let i of datos) {
                    date.push({value:i, label:i});
                   
                }
            
               setNewTime(date);
            
                }else{
                    
                    setNewTime([]);
                }
            })
            }
            }></input>
        <br></br>
        <label><h4>Hora: </h4></label>
        <Select options={newTime} id="select"/> 
        <br></br>
        <div className="row">
            <div className="col-4"></div>
        <button className="col-3" onClick={()=>{
              if(document.cookie){
     
      
                let cookie = document.cookie.split(",");
                let usu = cookie[0].split(";")[0].split("=")[1];
                console.log(usu)
                
               
            onNewCita({
                hora: document.getElementById("select").textContent,
                fecha: newDate

            });
            let date =[newDate+" "+document.getElementById("select").textContent,usu];
            socket.emit("createCita",date);
            window.location.replace('');
            
            
        }}}>Enviar</button>
        </div>
        </>
    )

}
Cita.propTypes = {
    onNewCita: PropTypes.func,
}

Cita.defaultProps ={
    onNewCita:  ()=>{},
}
export default Cita;
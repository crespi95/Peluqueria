import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import socketIOClient from "socket.io-client";
import Select from 'react-select';
//const ENDPOINT = "http://51.210.108.3:4002";
const ENDPOINT = "http://localhost:4002/";
const socket = socketIOClient(ENDPOINT);



const Cita = ({onNewCita})=>{
    const [newDate, setNewDate]= useState("");
    const [newTime, setNewTime]= useState([]);
    const date =[];
    const Hora = "";
  
    return(
        <>
        <label>Fecha: </label>
        <input type="date" value={newDate}  onChange={e=>{
            setNewDate(e.target.value);
            socket.emit("fecha",e.target.value);
            socket.on("horario",datos=>{
                setNewTime(datos);
                for (let i of datos) {
                    date.push({value:i, label:i});
                   
                }
               setNewTime(date);
            })
            }
            }></input>
        <br></br>
        <label>Hora: </label>
        <Select options={newTime} id="select"/> 
        <button onClick={()=>{
            onNewCita({
                hora: document.getElementById("select").textContent,
                fecha: newDate

            });
            let date =[newDate+" "+document.getElementById("select").textContent,"Pedro"];
            socket.emit("createCita",date);
           
            
            
        }}>Enviar</button>
        <br></br>
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
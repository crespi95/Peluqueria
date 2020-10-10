import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://51.210.108.3:4002";
//const ENDPOINT = "http://localhost:4002/";
const socket = socketIOClient(ENDPOINT); 

const Contacto = ()=>{
   
    const [newEmail, setNewEmail] = useState("");
    const [newMensaje, setNewMensaje] = useState("");
    return(
        <>
        <br></br>

<form action="#" class="needs-validation" novalidate class="col-5" style={{marginLeft:"40%"}}>


<div class="form-row">
<div class="col-md-4 mb-3">
<label for="validarEmail">Email:<span class="red">*</span></label>
<input type="email" class="form-control" id="validarEmail" name="validarEmail" value={newEmail}  onChange={e=>setNewEmail(e.target.value) } onKeyUp={e=>{
        if(e.key == "Enter" && newEmail!="" && newMensaje!="") {
         
        let mensaje = [newEmail,newMensaje];
        socket.emit("enviarMail",mensaje);
       }}}/>
</div>
</div>




<div class="form-row">
<div class="col-md-4 mb-3">

</div>
</div>

<div class="form-group">
<label for="validationMensaje">Mensaje:<span class="red">*</span></label>
<textarea class="form-control" id="validationMensaje" name="validationMensaje" rows="5" min="25" required style={{width:"50%"}} value={newMensaje} onChange={e=>setNewMensaje(e.target.value) } onKeyUp={e=>{
    if(e.key == "Enter" && newEmail!="" && newMensaje!="") {
     
    let mensaje = [newEmail,newMensaje];
    socket.emit("enviarMail",mensaje);
   }}}></textarea>
</div>

<div class="form-group mb-10">
<button class="btn btn-primary" type="submit" name="submit" onClick={()=>{
   
        if( newEmail!="" && newMensaje!="") {
         
        let mensaje = [newEmail,newMensaje];
        socket.emit("enviarMail",mensaje);
       }
}}>Enviar</button>
<button class="btn btn-success" type="reset" name="reset" onClick={()=>{
    setNewMensaje("");
    setNewEmail("");
}}>Limpiar</button>
</div>

</form>


        </>
    )


}

export default Contacto;
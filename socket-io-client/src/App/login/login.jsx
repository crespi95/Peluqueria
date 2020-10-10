import React from "react";
import Registro from "../components/registro";

import Login from "../components/login";
import socketIOClient from "socket.io-client";
import "bootstrap/dist/css/bootstrap.min.css"
const ENDPOINT = "http://51.210.108.3:4002";

const socket = socketIOClient(ENDPOINT); 

const usuarios = [
    {name:"Ricardo", pass:"1234"},
    {name:"Pedro", pass:"3124"}
];


const Lgin = () => {
  function login(){
    let login = true;
    if(document.cookie){
      login = false;
      window.location.href = "/inicio"
    }
    else{
      login = true;
    }
    if(login){
      return <Login />
    }
  }
  function registro(){
    let login = true;
    if(document.cookie){
      login = false;
    }
    else{
      login = true;
    }
    if(login){
      return <Registro />
      //onNewUser={newUser => setUsers([ newUser, ...user])}
    }
  }
  function inicioSe(){
    return <div className="row">
      <div className="col-3"></div>
      <div className="col-4">
      {registro()}
      </div>
      <div className="col-3">
      {login()}
      </div>
    </div>
  }
   

    return(
      <>
      <br></br>
    {inicioSe()}
    <br></br>
    <br></br><br></br>
    <br></br>
    <br></br>
  </>
    )}
export default Lgin;

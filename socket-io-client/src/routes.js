//dependencia
import React from "react";
import {Switch, Route} from "react-router-dom";

//Componentes
import Inicio from "./App/inicio";
import Login from "./App/login";
import Pedir from "./App/pedir";
import Citas from "./App/misCitas";
import Contacto from "./App/contacto";



const AppRoute  = () =>{

  return(
    
    <Switch>
        <Route path="/inicio" component={Inicio} />
        <Route path="/login" component={Login} />
        <Route path="/pedirCita" component={Pedir} />
        <Route path="/misCitas" component={Citas} />
        <Route path="/contacto" component={Contacto} />
    </Switch>

  )


    
}
export default AppRoute;
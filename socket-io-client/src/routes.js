//dependencia
import React from "react";
import {Switch, Route} from "react-router-dom";

//Componentes
import Inicio from "./App/inicio";
import Login from "./App/login";

const AppRoute  = () =>{

  return(
    <Switch>
        <Route path="/inicio" component={Inicio} />
        <Route path="/login" component={Login} />
    </Switch>

  )


    
}
export default AppRoute;
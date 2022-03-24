import React, { useState } from "react";
import { useStyles } from "./styles";
import Login from "../../components/login";
import Register from "../../components/register"
import { Switch, Route, Link } from "react-router-dom";

const LoginTemplate = ({ openDrawer }) => {
  const classes = useStyles();

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to={"/login"}>Iniciar sesion</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/register"}>Registrarse</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="auth-wrapper">
        <div className="auth-inner">
          <Switch>
            <Route exact path='/' component={Login} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
          </Switch>
        </div>
      </div>
    </div>
    
  );
};

export default LoginTemplate;

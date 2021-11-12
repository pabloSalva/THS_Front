import React from "react";
import LoginTemplate from "../templates/loginTemplate";
import { useAlert } from "react-alert";
const Login = () => {
  const alerta = useAlert()
  return <LoginTemplate alerta={alerta} />;
};

export default Login;

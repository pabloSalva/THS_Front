import React, { Component } from "react";
import swal from 'sweetalert';


export default class Register extends Component {
    state = {
        credentials: {
            username: '',
            email: '',
            password: '',
            repassword: ''
        }
    }

    register = event => {
        if (this.state.credentials.username == '' | this.state.credentials.password == '' | this.state.credentials.email == '' | this.state.credentials.repassword == ''){
            swal("Ha ocurrido un error", "Por favor, completa todos los campos.", "error")
        } else {
            if (this.state.credentials.password === this.state.credentials.repassword){
                fetch('http://127.0.0.1:7000/api/users/', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(this.state.credentials)
                })
                .then((response) => {
                    if (response.status === 200 || response.status === 201){
                        this.props.history.push('/login')
                        swal("Exito!", "Te has registrado correctamente, ya puedes iniciar sesion.", "success")
                    } else swal("Atencion!", "El nombre de usuario seleccionado ya existe.", "warning")
                }).catch( error => console.error(error))
            } else swal("Ha ocurrido un error", "Las contraseñas no coinciden.", "error")
        }
    }


    inputChanged = event => {
        const cred = this.state.credentials;
        cred[event.target.name] = event.target.value;
        this.setState({credentials: cred});
    }
    
    render() {
        return (
            <div>
                <img src={process.env.PUBLIC_URL + "/Casita.png"} alt="Logo" style={{ width: 100,
                    height: 100, marginTop: 60, marginBottom: 15, marginLeft: 120}}/>
                <h3>Registrate</h3>

                <div className="form-group">
                    <label style={{marginBottom: 5}}>Usuario</label>
                    <input type="text" className="form-control" 
                    name="username" placeholder="Ingresa tu nombre de usuario"
                    value={this.state.credentials.username}
                    onChange={this.inputChanged} />
                </div>

                <div className="form-group">
                    <label style={{marginBottom: 5, marginTop: 10}}>Correo electronico</label>
                    <input type="email" className="form-control" 
                    name="email" placeholder="Ingresa tu correo electronico"
                    value={this.state.credentials.email}
                    onChange={this.inputChanged} />
                </div>

                <div className="form-group">
                    <label style={{marginBottom: 5, marginTop: 10}}>Contraseña</label>
                    <input type="password" className="form-control" 
                    name="password" placeholder="Ingresa tu contraseña"
                    value={this.state.credentials.password}
                    onChange={this.inputChanged} />
                </div>

                <div className="form-group">
                    <label style={{marginBottom: 5, marginTop: 10}}>Repetir contraseña</label>
                    <input type="password" className="form-control" 
                    name="repassword" placeholder="Repite tu contraseña"
                    value={this.state.credentials.repassword}
                    onChange={this.inputChanged} />
                </div>
                    <br />
                <button onClick={this.register} style={{marginLeft: 120}} type="button" className="btn btn-success btn-block">Registrarse</button>
                <p className="forgot-password text-right">
                    ¿Ya estas registrado? <a href="/login">Inicia sesion.</a>
                </p>
            </div>
        );
    }
}
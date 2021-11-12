import React, { Component } from 'react';
import './bootstrap.min.css';
import swal from 'sweetalert';

class Login extends Component {

    state = {
        credentials: {
            username: '',
            password: '',
        }
    }

    login = event => {
        if (this.state.credentials.username == '' | this.state.credentials.password == ''){
            swal("Ha ocurrido un error", "Por favor, completa todos los campos.", "error")
        } else {
            fetch('http://127.0.0.1:7000/auth/', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(this.state.credentials)
            })
            .then((response) => {
                if (response.status === 200){
                    this.props.history.push('/')
                } else swal("Ha ocurrido un error", "Por favor, revisa los datos ingresados.", "error")
            }).catch( error => console.error(error))
        }
    }

    register = event => {
        fetch('http://127.0.0.1:7000/api/users/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(this.state.credentials)
        })
        .then( data => data.json())
        .then(
            data => {
                console.log(data.token);
            }
        ).catch( error => console.error(error))
    }

    inputChanged = event => {
        const cred = this.state.credentials;
        cred[event.target.name] = event.target.value;
        this.setState({credentials: cred});
    }

    render() {
        return (
    <div style= {{textAlign: 'center'}}>
        <img src={process.env.PUBLIC_URL + "/Casita.png"} alt="Logo" style={{ width: 100,
                    height: 100, marginTop: 60, marginBottom: 15}}/>
        <h3>Tu Hogar Sustentable</h3>
        <div className="form-group" >
        <label>Usuario:
            <input type="text" name="username" 
            className="form-control" placeholder="Ingresa tu usuario"
            value={this.state.credentials.username}
            onChange={this.inputChanged} />
        </label>
        </div>
        <br />
        <div className="form-group">
            <label>Contraseña:
            <input type="password" name="password" 
            className="form-control" placeholder="Ingresa tu contraseña"
            value={this.state.credentials.password}
            onChange={this.inputChanged} />
        </label>
        </div>
        <br />
        <button onClick={this.login} type="submit" className="btn btn-success btn-block">Iniciar sesion</button>
        <p className="forgot-password text-right">
                    ¿No tenes cuenta? <a href="/register">Registrate.</a>
                </p>
        {/* <button onClick={this.register}>Register</button> */}
    </div>
        );
    }
}

export default Login;

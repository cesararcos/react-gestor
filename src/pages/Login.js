import React, { Component, useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import '../css/Login.css';
import Cookies from 'js-cookie';

function Login() {
  const baseUrl = "http://localhost:5099/api/Gestores";
  const [gestorSeleccionado, setGestorSeleccionado] = useState({
    id: '',
    usuario: '',
    contrasena: '',
    rol: ''
  })

  //Metodo para capturar data de input
  const handleChange = e => {
    const { name, value } = e.target;
    setGestorSeleccionado({
      ...gestorSeleccionado,
      [name]: value
    });
    console.log(gestorSeleccionado);
  }

  const peticionGet = async () => {

    if (gestorSeleccionado.usuario.length <= 0 || gestorSeleccionado.contrasena.length <= 0) {
      console.log("usuario vacio");
      alert('usuario y/o contraseña vacio');
      return;
    }
    await axios.post(baseUrl + "/GetUser", gestorSeleccionado)
      .then(response => {
        console.log(response.data);

        if (response.data) {
          Cookies.set('user', gestorSeleccionado.usuario, { expires: 1 });
          console.log("El usuario es correcto! - Cookie user:  " + Cookies.get('user'));
          window.location.href = "./indexadmon";
          return;
        }
        else {
          console.log("Usuario no existe");
          alert('Usuario no existe, intente de nuevo');
          return;
        }

      })
      .catch(error => {
        console.log(error);
      })
  }
  
  const register = async () => {
    window.location.href = "./register";
  }

  return (
    <div className="containerPrincipal">
      <div className="containerSecundario">
        <div className="form-group">
          <h2>Sign In</h2>
          <br />
          <label>Usuario: </label>
          <br />
          <input type="text" className="form-control" name="usuario" onChange={handleChange} />
          <br />
          <label>Contraseña: </label>
          <br />
          <input type="password" className="form-control" name="contrasena" onChange={handleChange} />
          <br />
          <button className="btn btn-success" onClick={() => peticionGet()}>Iniciar Sesion</button>
          <br />
          <br />
          <button className="btn btn-primary" onClick={() => register()}>Registrarse</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
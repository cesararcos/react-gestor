import React, { Component, useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Register.css';
import axios from 'axios';
import Select from 'react-select';

function Register() {
    const baseUrl = "http://localhost:5099/api/Gestores";
    const [data, setData] = useState([]);
    const [gestorSeleccionado, setGestorSeleccionado] = useState({
        id: '',
        usuario: '',
        contrasena: '',
        rol: '',
        exist: false
    })

    useEffect(() => {
        peticionGetList();
    }, [])

    //Metodo para capturar data de input
    const handleChange = e => {
        const { name, value } = e.target;
        setGestorSeleccionado({
            ...gestorSeleccionado,
            [name]: value
        });
        console.log(gestorSeleccionado);
    }

    const peticionGetList = async () => {
        await axios.get(baseUrl + "/GetRoles")
            .then(response => {
                console.log(response.data);
                setData(response.data);
            }).catch(error => {
                console.log(error);
            })
    }

    const save = async () => {
        if (gestorSeleccionado.usuario.length <= 0 || gestorSeleccionado.contrasena.length <= 0) {
            console.log("usuario vacio");
            peticionGetList();
            alert('usuario y/o contraseña vacio');
            return;
        }
        await axios.post(baseUrl + "/GetUser", gestorSeleccionado)
            .then(response => {
                setData(response.data);
                console.log(response.data);
                if (response.data) {
                    gestorSeleccionado.exist = response.data;
                    alert('Usuario existente, intente de nuevo');
                }
            })
            .catch(error => {
                console.log(error);
            })

        if (gestorSeleccionado.exist) {
            peticionGetList();
            gestorSeleccionado.exist = false;
            return;
        }

        gestorSeleccionado.rol = result;

        await axios.post(baseUrl + "/SaveUser", gestorSeleccionado)
            .then(response => {
                setData(response.data);
                console.log(response.data);
                if (response.data) {
                    alert('Registro exitoso!');
                    window.location.href = "./";
                    return;
                }
            })
            .catch(error => {
                console.log(error);
            })
    }

    var list = [{
        value: 1,
        label: ""
    }]

    const [result, listValue] = useState(list.label);
    const listHandler = e => {
        listValue(e.label);
        console.log(e.label);
    }

    return (
        <div className="containerPrincipal">
            <div className="containerSecundario">
                <div className="form-group">
                    <h2>Registrarse</h2>
                    <br />
                    <label>Usuario: </label>
                    <br />
                    <input type="text" className="form-control" name="usuario" onChange={handleChange} />
                    <br />
                    <label>Contraseña: </label>
                    <br />
                    <input type="password" className="form-control" name="contrasena" onChange={handleChange} />
                    <br />
                    <label>Rol: </label>
                    <Select options={data} onChange={listHandler}></Select>
                    <br />
                    <button className="btn btn-success" onClick={() => save()}>Registrar</button>
                </div>
            </div>
        </div>
    );
}
export default Register;
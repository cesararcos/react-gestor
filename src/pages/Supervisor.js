import React, { Component, useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import Select from 'react-select';

function Supervisor() {
    const baseUrl = "http://localhost:5099/api/Gestores";
    const [data, setData] = useState([]);
    const [dataTask, setTask] = useState([]);
    const [dataState, setState] = useState([]);
    const [modalEditar, setModalEditar] = useState(false);
    const [gestorSeleccionado, setGestorSeleccionado] = useState({
        id: '',
        usuario: '',
        contrasena: '',
        rol: '',
        task: '',
        state: ''
    })

    const volverMenu = () => {
        window.location.href = "./indexadmon";
    }

    //Metodo para mostrar lista tareas
    const peticionGetTask = async () => {
        await axios.get(baseUrl + "/GetTasksList")
            .then(response => {
                setTask(response.data);
                console.log(response.data);
            }).catch(error => {
                console.log(error);
            })
    }

    //Metodo para mostrar lista estados
    const peticionGetState = async () => {
        await axios.get(baseUrl + "/GetStateList")
            .then(response => {
                setState(response.data);
                console.log(response.data);
            }).catch(error => {
                console.log(error);
            })
    }

    //Metodo para mostrar usuarios
    const peticionGet = async () => {
        await axios.get(baseUrl + "/GetUserAll")
            .then(response => {
                const filtered = response.data.filter(user => user.rol == 'Empleado');
                setData(filtered);
                console.log(response.data);
            }).catch(error => {
                console.log(error);
            })
    }

    //Metodo para obtener data de input
    const handleChange = e => {
        const { name, value } = e.target;
        setGestorSeleccionado({
            ...gestorSeleccionado,
            [name]: value
        });
        console.log(gestorSeleccionado);
    }

    //Metodo para editar tarea
    const peticionPut = async () => {
        console.log(gestorSeleccionado);
        gestorSeleccionado.task = resultSelectTask;
        gestorSeleccionado.state = resultSelectState;
        await axios.post(baseUrl + "/EditTaskByUser", gestorSeleccionado)
            .then(response => {
                if (!response.data) {
                    peticionGet();
                    console.log('Responde servicio' + response.data);
                    alert('No fue posible asignar, intente nuevamente');
                    return;
                }
                peticionGet();
                abrirCerrarModalEditar();
            }).catch(error => {
                console.log(error);
            })
    }

    const seleccionarGestor = (gestor, caso) => {
        setGestorSeleccionado(gestor);
        (caso == "Editar") ?
            abrirCerrarModalEditar() : abrirCerrarModalEditar();
    }

    const abrirCerrarModalEditar = () => {
        setModalEditar(!modalEditar);
    }

    var list = [{
        value: 1,
        label: ""
    }]

    // Función select Task
    const [resultSelectTask, listValue] = useState(list.label);
    const listHandler = e => {
        listValue(e.label);
        console.log(e.label);
    }

    // Función select State
    const [resultSelectState, listValueState] = useState(list.label);
    const listHandlerState = e => {
        listValueState(e.label);
        console.log(e.label);
    }

    useEffect(() => {
        peticionGet();
        peticionGetTask();
        peticionGetState();
    }, [])

    return (
        <div className="App">
            <br /><h1>Supervisor</h1>
            <div className="Appp">
                <br />
                <h3>Registro de empleados:</h3>
                <br /><br />
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th style={{ textAlign: 'center' }}>EMPLEADO</th>
                            <th style={{ textAlign: 'center' }}>TAREA</th>
                            <th style={{ textAlign: 'center' }}>ESTADO TAREA</th>
                            <th style={{ width: 200, textAlign: 'center' }}>ACCIONES</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(gestor => (
                            <tr key={gestor.id}>
                                <td>{gestor.usuario}</td>
                                <td>{gestor.task}</td>
                                <td>{gestor.state}</td>
                                <td style={{ textAlign: 'center' }}>
                                    <button className="btn btn-primary" onClick={() => seleccionarGestor(gestor, "Editar")}>Asignar</button> {" "}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <Modal isOpen={modalEditar}>
                    <ModalHeader>Editar tarea:</ModalHeader>
                    <ModalBody>
                        <div className="form-group">
                            <label>Descripcion: </label>
                            <br />
                            <input type="text" className="form-control" name="description" onChange={handleChange} value={gestorSeleccionado && gestorSeleccionado.usuario} />
                            <br />
                            <label>Tarea: </label>
                            <Select options={dataTask} onChange={listHandler}></Select>
                            <br />
                            <label>Estado: </label>
                            <Select options={dataState} onChange={listHandlerState}></Select>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <button className="btn btn-primary" onClick={() => peticionPut()}>Actualizar</button> {" "}
                        <button className="btn btn-danger" onClick={() => abrirCerrarModalEditar()}>Cancelar</button>
                    </ModalFooter>
                </Modal>

                <br /><br />
                <button className="btn btn-secondary" onClick={() => volverMenu()}>Volver Menú</button> {" "}
            </div>
        </div>
    );
}
export default Supervisor;
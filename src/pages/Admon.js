import React, { Component, useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

function Admon() {
  const baseUrl = "http://localhost:5099/api/Gestores";
  const [data, setData] = useState([]);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [gestorSeleccionado, setGestorSeleccionado] = useState({
    id: '',
    description: '',
    active: ''
  })
  const [gestorGuardar, setGestorGuardar] = useState({
    id: '',
    description: ''
  })

  const volverMenu = () => {
    window.location.href = "./indexadmon";
  }

  //Metodo para mostrar tareas
  const peticionGet = async () => {
    await axios.get(baseUrl + "/GetTasks")
      .then(response => {
        const filtered = response.data.filter(user => user.active == true);
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

  //Metodo para guardar tareas
  const peticionPost = async () => {
    if (gestorSeleccionado.description.length <= 0) {
      alert('Existen campos sin llenar');
      return;
    }
    
    gestorGuardar.id = gestorSeleccionado.id;
    gestorGuardar.description = gestorSeleccionado.description;
    console.log(gestorGuardar);
    await axios.post(baseUrl + "/SaveTask", gestorGuardar)
      .then(response => {
        
        peticionGet();
        abrirCerrarModalInsertar();
        console.log("Producto creado!");
      }).catch(error => {
        console.log(error);
      })
  }

  //Metodo para editar tarea
  const peticionPut = async () => {
    //gestorSeleccionado.codigo = parseInt(gestorSeleccionado.codigo);
    console.log(gestorSeleccionado);
    
    await axios.post(baseUrl + "/EditTask", gestorSeleccionado)
      .then(response => {

        peticionGet();
        abrirCerrarModalEditar();
      }).catch(error => {
        console.log(error);
      })
  }

  //Metodo eliminar tares
  const peticionDelete = async () => {
    await axios.post(baseUrl + "/DeleteTask", gestorSeleccionado)
      .then(response => {
        peticionGet();
        
        abrirCerrarModalEliminar();
      }).catch(error => {
        console.log(error);
      })
  }

  const seleccionarGestor = (gestor, caso) => {
    setGestorSeleccionado(gestor);
    (caso == "Editar") ?
      abrirCerrarModalEditar() : abrirCerrarModalEliminar();
  }

  const abrirCerrarModalInsertar = () => {
    setModalInsertar(!modalInsertar);
  }

  const abrirCerrarModalEditar = () => {
    setModalEditar(!modalEditar);
  }

  const abrirCerrarModalEliminar = () => {
    setModalEliminar(!modalEliminar);
  }

  useEffect(() => {
    peticionGet();
  }, [])


  return (
    <div className="App">
      <br /><h1>Administrador</h1>
      <div className="Appp">
        <br />
        <h3>Registro de tareas:</h3>
        <br />
        <button onClick={() => abrirCerrarModalInsertar()} className="btn btn-success">Crear tarea</button>
        <br /><br />
        <table className="table table-bordered">
          <thead>
            <tr>
              <th style={{ textAlign: 'center' }}>DESCRIPCIÓN</th>
              <th style={{ width: 200, textAlign: 'center' }}>ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            {data.map(gestor => (
              <tr key={gestor.id}>
                <td>{gestor.description}</td>
                <td style={{ textAlign: 'center' }}>
                  <button className="btn btn-primary" onClick={() => seleccionarGestor(gestor, "Editar")}>Editar</button> {" "}
                  <button className="btn btn-danger" onClick={() => seleccionarGestor(gestor, "Eliminar")}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Modal isOpen={modalInsertar}>
          <ModalHeader>Insertar tarea:</ModalHeader>
          <ModalBody>
            <div className="form-group">
              <label>Tarea: </label>
              <br />
              <input type="text" className="form-control" name="description" onChange={handleChange} />
            </div>
          </ModalBody>
          <ModalFooter>
            <button name='insertartBtn' className="btn btn-primary" onClick={() => peticionPost()}>Crear</button> {" "}
            <button className="btn btn-danger" disabled={!gestorSeleccionado} onClick={() => abrirCerrarModalInsertar()}>Cancelar</button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={modalEditar}>
          <ModalHeader>Editar tarea:</ModalHeader>
          <ModalBody>
            <div className="form-group">
              <label>Descripcion: </label>
              <br />
              <input type="text" className="form-control" name="description" onChange={handleChange} value={gestorSeleccionado && gestorSeleccionado.description} />
            </div>
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-primary" onClick={() => peticionPut()}>Actualizar</button> {" "}
            <button className="btn btn-danger" onClick={() => abrirCerrarModalEditar()}>Cancelar</button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={modalEliminar}>
          <ModalBody>
            ¿Estás seguro que deseas eliminar el producto de Base de Datos {gestorSeleccionado && gestorSeleccionado.nombre} ?
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-danger" onClick={() => peticionDelete()}>
              Sí
            </button>
            <button className="btn btn-secondary" onClick={() => abrirCerrarModalEliminar()}>
              No
            </button>
          </ModalFooter>
        </Modal>

        <br /><br />
        <button className="btn btn-secondary" onClick={() => volverMenu()}>Volver Menú</button> {" "}
      </div>


    </div>
  );
}
export default Admon;
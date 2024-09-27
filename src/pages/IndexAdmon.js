import React, { Component, useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Nav, Navbar } from 'react-bootstrap';
import '../css/IndexAdmon.css';
import Cookies from 'js-cookie';

function IndexAdmon() {
  const baseUrl = "http://localhost:5099/api/Gestores";
  const [data, setData] = useState([]);

  const peticionGet=async()=>{
    console.log("Entro en Index - Cookie user:  " + Cookies.get('user'));
  }

    useEffect(()=>{
      peticionGet();
    },[])

  return (
    <div className="IndexAdmon">
      <Navbar bg="dark" variant="dark" sticky="top">
        <Navbar.Brand>
          Sistema de Gestión
        </Navbar.Brand>

        <Nav className="navt">
          <Nav.Link href={ "./admon" }>Administrador</Nav.Link>
          <Nav.Link href={ "./supervisor" }>Supervisor</Nav.Link>
          <Nav.Link href={ "./employee" }>Empleado</Nav.Link>
        </Nav>
      </Navbar>
    </div>
  );

}
export default IndexAdmon;
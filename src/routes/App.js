//import logo from './logo.svg';
import React, { Component, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Login from '../pages/Login';
import IndexAdmon from '../pages/IndexAdmon';
import Test from '../pages/Test';
import Admon from '../pages/Admon';
import Register from '../pages/Register';
import Supervisor from '../pages/Supervisor';
import Employee from '../pages/Employee';

function App() {
  const baseUrl = "http://localhost:5099/api/Gestores";
  const [data, setData] = useState([]);
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/test" element={<Test />}></Route>
        <Route path="/indexadmon" element={<IndexAdmon />}></Route>
        <Route path="/admon" element={<Admon />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/supervisor" element={<Supervisor />}></Route>
        <Route path="/employee" element={<Employee />}></Route>
      </Routes>

    </BrowserRouter>
  );
}

export default App;

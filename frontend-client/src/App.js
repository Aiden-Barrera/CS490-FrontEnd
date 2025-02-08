//import './App.css';
import React, { useEffect, useState } from 'react';
import {Routes, Route} from "react-router-dom";
import Navbar from './components/Navbar.js'
import Home from './pages/Home.js'
import Films from './pages/Films.js'
import Customer from './pages/Customer.js'

function App() {
  
  return (
    <div className='App'>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path='/films' element={<Films/>}/>
        <Route path='/customer' element={<Customer/>}/>
      </Routes>
    </div>
  )
}

export default App;

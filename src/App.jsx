import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Provider } from 'react-redux';
import store from './store/store';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './componentes/login';
import Registro from './componentes/registro';
import { ToastContainer } from 'react-toastify';
import Dashboard from './componentes/dashboard';

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </BrowserRouter>
        <ToastContainer />
      </Provider>
    </>
  )
}

export default App

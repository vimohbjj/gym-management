import React from 'react'
import AgregarSesion from './agregarSesion'
import { useNavigate } from 'react-router-dom'
import Analisis from "../componentes/analisis"
import ListadoSesiones from "../componentes/listadoSesiones"
import { useDispatch, useSelector } from 'react-redux'
import { vaciarSesiones } from '../features/sesionesSlice'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import { useState } from 'react'
import { guardarSesiones } from '../features/sesionesSlice'
import { guardarActividades } from '../features/actividadesSlice';

const dashboard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const apiKey = localStorage.getItem("apiKey");
    const sesiones = useSelector(state => state.sesiones.sesiones);

    const Logout = () => {
        localStorage.setItem("apiKey", null);
        localStorage.setItem("id", null);
        dispatch(vaciarSesiones());
        navigate("/");
        toast.success("Logout exitoso");
    }

    useEffect(() => {
        const idUsu = localStorage.getItem("id");

        if (apiKey === null || apiKey === "null") {
            toast.warning("Funcionalidad restringida, primero haga login");
            navigate("/");
            return;
        }
        
        // fetch sesiones
        fetch(`https://movetrack.develotion.com/registros.php?idUsuario=${idUsu}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "apikey": apiKey,
                "iduser": idUsu
            }
        })
            .then((response) => response.json())
            .then((datos) => {
                if (datos.codigo === 200) {
                    dispatch(guardarSesiones(datos.registros));
                } else if (datos.codigo === 401) {
                    toast.warning("Acceso no autorizado a");
                } else {
                    toast.error("Error a");
                }
            })

        // fetch actividades
        fetch("https://movetrack.develotion.com/actividades.php", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                apikey: apiKey,
                iduser: idUsu
            }
        })
            .then((response) => response.json())
            .then((datos) => {
                if (datos.codigo === 200) {
                    dispatch(guardarActividades(datos.actividades));
                } else {
                    toast.error("Error inesperado b");
                }
            })

    }, [sesiones]);

    return (
        <div>
            <header>
                <h2>JUST DO IT...</h2>
                <input type="button" value="Logout" onClick={Logout} />
            </header>
            <AgregarSesion />
            <ListadoSesiones sesiones={sesiones} />
            <Analisis />
        </div>
    )
}

export default dashboard
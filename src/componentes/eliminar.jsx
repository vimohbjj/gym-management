import React from 'react'
import { useDispatch } from 'react-redux';
import { eliminarSesion } from '../features/sesionesSlice';
import { toast } from 'react-toastify';

const eliminar = ({ id }) => {
    const dispatch = useDispatch();

    const Eliminar = () => {
        const apiKey = localStorage.getItem("apiKey");
        const idUsu = localStorage.getItem("id");

        fetch(`https://movetrack.develotion.com/registros.php?idRegistro=${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "apikey": apiKey,
                "iduser": idUsu 
            }
        })
            .then((response) => response.json())
            .then((datos) => {
                console.log(datos);
                if(datos.codigo === 200){
                    dispatch(eliminarSesion(id));
                    toast.success(datos.mensaje);
                } else {
                    toast.error("No se ha podido eliminar su sesion");
                }
            })

    }

    return (
        <>
            <input type="button" value="Eliminar" onClick={Eliminar} />
        </>
    )
}

export default eliminar
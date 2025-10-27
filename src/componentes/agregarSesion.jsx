import { useRef, React, useId } from 'react'
import SelectActividades from './selectActividades';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

const agregarSesion = () => {
    const actividad = useRef(null);
    const tiempo = useRef(null);
    const fecha = useRef(null);
    const actividadId = useId();
    const tiempoId = useId();
    const fechaId = useId();
    let apiKey = localStorage.getItem("apiKey");
    const idUsu = localStorage.getItem("id");
    let navigate = useNavigate();
    const fechaActual = new Date();

    const registrarSesion = () => {
        if (Date.parse(fecha.current.value) > fechaActual) {
            toast.warning("La fecha de la sesion no puede ser mayor a la fecha actual");
            return;
        } else if (tiempo.current.value <= 0) {
            toast.warning("El tiempo de la sesion no puede ser igual o menor a 0");
            return;
        } else if(fecha.current.value === ""){
            toast.warning("Escoja una fecha porfavor")
            return;
        }

        fetch("https://movetrack.develotion.com/registros.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                apikey: apiKey,
                iduser: idUsu
            },
            body: JSON.stringify({
                "idActividad": actividad.current.value,
                "idUsuario": idUsu,
                "tiempo": tiempo.current.value,
                "fecha": fecha.current.value
            })
        })
            .then(response => response.json())
            .then(datos => {
                if (datos.codigo === 200) {
                    toast.success(datos.mensaje);
                } else {
                    toast.error("Error inesperado :(");
                }
            })
    }

    return (
        <div id="agregarS">
            <form className="form flex gap-1">
                <p>
                    <label htmlFor={actividadId}>Actividad: </label>
                    <SelectActividades ref={actividad} />
                </p>
                <p>
                    <label htmlFor={tiempoId}>Tiempo(minutos): </label>
                    <input type="number" name="tiempo" id={tiempoId} ref={tiempo} />
                </p>
                <p>
                    <label htmlFor={fechaId}>Fecha: </label>
                    <input type="date" name="fecha" id={fechaId} ref={fecha} />
                </p>
                <input type="button" value="Registrar" onClick={registrarSesion} />
            </form>
        </div>
    )
}

export default agregarSesion
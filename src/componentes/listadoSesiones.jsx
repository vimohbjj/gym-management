import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Eliminar from './eliminar'
import { getDay, differenceInDays } from 'date-fns';

const listadoSesiones = ({ sesiones }) => {
    const actividades = useSelector(state => state.actividades.actividades);
    const [filtroActivo, setFiltroActivo] = useState('todas');
    const [sesionesFiltradas, setSesionesFiltradas] = useState([]);

    const filtrarSesiones = (filtro) => {
        const hoy = new Date();

        switch (filtro) {
            case 'semana':
                return sesiones.filter(s =>
                    differenceInDays(hoy, new Date(s.fecha)) <= 7
                );
            case 'mes':
                return sesiones.filter(s =>
                    differenceInDays(hoy, new Date(s.fecha)) <= 30
                );
            case 'todas':
                return sesiones;
        }
    };

    useEffect(() => {
        setSesionesFiltradas(filtrarSesiones(filtroActivo));
    }, [filtroActivo, sesiones]);

    const traerNombre = (idActividad) => {
        let actividad = actividades.find(a => a.id === idActividad)
        return actividad ? actividad.nombre : "No encontrado";
    }

    const traerIcono = (idActividad) => {
        let actividad = actividades.find(a => a.id === idActividad)
        return actividad.imagen;
    }

    return (
        <section>
            <h2>Mis sesiones</h2>
            <input className='margin-1' type="button" value="Todas las sesiones" onClick={() => setFiltroActivo("todas")}/>
            <input className='margin-1' type="button" value="Sesiones del ultimo mes" onClick={() => setFiltroActivo('mes')} />
            <input className='margin-1' type="button" value="Sesiones ultima semana" onClick={() => setFiltroActivo('semana')} />
            <table>
                <thead>
                    <tr>
                        <th>Icono</th>
                        <th>Actividad</th>
                        <th>Tiempo</th>
                        <th>Fecha</th>
                        <th>Accion</th>
                    </tr>
                </thead>
                <tbody id="cuerpoTabla">
                    {sesionesFiltradas.map(s => (
                        <tr key={s.id}>
                            <td>
                                <img
                                    src={`https://movetrack.develotion.com/imgs/${traerIcono(s.idActividad)}.png`}
                                    alt="Icono actividad"
                                    className="icono-actividad"
                                />
                            </td>
                            <td>{traerNombre(s.idActividad)}</td>
                            <td>{s.tiempo} min</td>
                            <td>{s.fecha}</td>
                            <td><Eliminar id={s.id} /></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    )
}

export default listadoSesiones
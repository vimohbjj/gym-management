import { React, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { guardarActividades } from '../features/actividadesSlice';
import { guardarSesiones } from '../features/sesionesSlice';
import EvaluacionPersonal from './evaluacionPersonal';
import { getDay, differenceInDays } from 'date-fns';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Tiempo total por actividad',
        },
    },
};

const analisis = () => {
    const sesiones = useSelector(state => state.sesiones.sesiones);
    const fechaActual = new Date();
    const actividades = useSelector(state => state.actividades.actividades)
    const [nombres, setNombres] = useState([]);
    const [tiempo, setTiempo] = useState([]);
    const [tiempoUltSemana, setTiempoUltSemana] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        let vecNombres = [];
        let vecTiempo = [];
        let tiempoUltimaSemana = [];
        const sesionesUltimaSemana = sesiones.filter(s => differenceInDays(fechaActual, Date.parse(s.fecha)) < 7);

        // buscamos todos los nombres de las actividades no repetidos por fecha
        for (let i = 0; i < sesiones.length; i++) {
            const nombreActividad = traerNombre(sesiones[i].idActividad);
            if (!vecNombres.some(nombre => nombre === nombreActividad)) {
                vecNombres.push(nombreActividad);
            }
        }
        setNombres(vecNombres);

        // Por cada nombre de sesion se busca el tiempo total de todas las sesiones con ese nombre
        for (let i = 0; i < vecNombres.length; i++) {
            let tiempoTotalSesion = 0;
            for (let j = 0; j < sesiones.length; j++) {
                const nombre = traerNombre(sesiones[j].idActividad);
                if (nombre === vecNombres[i]) {
                    tiempoTotalSesion += sesiones[j].tiempo;
                }
            }
            vecTiempo.push(tiempoTotalSesion);
        }
        setTiempo(vecTiempo);

        // cargando datos en minutos de la semana
        for (let i = 0; i < 7; i++) {
            let tiempo = 0;
            for (let j = 0; j < sesionesUltimaSemana.length; j++) {
                const dia = getDay(Date.parse(sesionesUltimaSemana[j].fecha));
                if (dia === i) {
                    tiempo += sesionesUltimaSemana[j].tiempo;
                }
            }
            tiempoUltimaSemana.push(tiempo);
        }

        setTiempoUltSemana(tiempoUltimaSemana);

    }, [sesiones])

    const traerNombre = (idActividad) => {
        let actividad = actividades.find(a => a.id === idActividad)
        return actividad ? actividad.nombre : "No encontrado";
    }

    return (
        <section>
            <h2>Analisis</h2>
            <div>
                <Bar options={options} data={{
                    labels: nombres,
                    datasets: [
                        {
                            label: "Tiempo(minutos)",
                            data: tiempo,
                            backgroundColor: 'rgba(255, 99, 132, 0.5)',
                        }
                    ],
                }} />
            </div>
            <div>
                <Line
                    options={{
                        responsive: true,
                        plugins: {
                            legend: { position: 'top' },
                            title: {
                                display: true,
                                text: 'Actividad en la última semana' 
                            }
                        }
                    }}
                    data={{
                        labels: ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"],
                        datasets: [{
                            label: "Tiempo (minutos)",
                            data: tiempoUltSemana,
                            borderColor: '#6A1E55', 
                            backgroundColor: '#3B1C32', 
                        }]
                    }}
                />
            </div>
            <EvaluacionPersonal sesiones={sesiones} />
        </section>
    )
}

export default analisis
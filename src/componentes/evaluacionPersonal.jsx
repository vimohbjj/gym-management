import React from 'react'
import { differenceInDays, startOfDay, isToday, parseISO } from 'date-fns'
import { useState, useEffect } from 'react';

const evaluacionPersonal = ({ sesiones }) => {
    const [entrenadoHoy, setEntrenadoHoy] = useState();
    const [entrenadoAyer, setEntrenadoAyer] = useState();

    useEffect(() => {
        const hoy = new Date();

        setEntrenadoHoy(
            sesiones
                .filter(s => isToday(parseISO(s.fecha)))
                .reduce((acumulador, objS) => acumulador + objS.tiempo, 0)
        );

        setEntrenadoAyer(
            sesiones
                .filter(s => differenceInDays(hoy, (parseISO(s.fecha))) === 1)
                .reduce((acumulador, objS) => acumulador + objS.tiempo, 0)
        );
    }, [sesiones])

    return (
        <section>
            <h2>Informe de tiempo</h2>
            <div className='flex gap'>
                <div className='background-rosa padding-2 border-radius-12'>
                    <h3>
                        Tiempo total entrenado:  
                        {sesiones.reduce((acumulador, objSesion) => acumulador + objSesion.tiempo, 0)}
                    </h3>
                </div>
                <div className='background-rosa padding-2 border-radius-12'>
                    <h3>Tiempo entrenado ayer:  {entrenadoAyer}</h3>
                </div>
                <div className='background-rosa padding-2 border-radius-12'>
                    <h3>Tiempo entrenado hoy: {entrenadoHoy}</h3>
                </div>
            </div>
            <div>
                {entrenadoHoy === 0 ?
                    <h3>A ponerse las pilas, entrena un poco hoy...</h3>
                    : entrenadoHoy > entrenadoAyer ?
                        <h3>Cada dia entrenas mas, sigue asi!!!</h3>
                        : <h3>No te rindas!!!</h3>
                }
            </div>
        </section>
    )
}

export default evaluacionPersonal
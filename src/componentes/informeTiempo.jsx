import React from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { differenceInDays, startOfDay, isToday, parseISO } from 'date-fns'

const informeTiempo = () => {
    const sesiones = useSelector(state => state.sesiones.sesiones);
    const dispatch = useDispatch();
    let fechaActual = new Date();

    return (
        <section>
            <h2>Informe de tiempo</h2>
            <div className='flex gap'>
                <div className='background-rosa padding-2 border-radius-12 color-blanco'>
                    <h3>Tiempo total entrenado: </h3>
                    <p>
                        {sesiones.reduce((acumulador, objSesion) => acumulador + objSesion.tiempo, 0)}
                        <label> minutos</label>
                    </p>
                </div>
                <div className='background-rosa padding-2 border-radius-12'>
                    <h3>Hoy has entrenado</h3>
                    <p>
                        {sesiones
                            .filter(s =>
                                differenceInDays(Date.parse(s.fecha), fechaActual) === 0
                            )
                            .reduce((acumulador, objS) => acumulador + objS.tiempo, 0)}
                        <label> minutos</label>
                    </p>
                </div>
            </div>
        </section>
    )
}

export default informeTiempo
import { useRef, React, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { guardarActividades } from '../features/actividadesSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const selectActividades = ({ ref }) => {
    const actividades = useSelector(state => state.actividades.actividades);

    return (
        <select ref={ref}>
            {actividades.map(objActividad =>
                <option value={objActividad.id} key={objActividad.id}>
                    {objActividad.nombre}
                </option>)}
        </select>
    )
}

export default selectActividades
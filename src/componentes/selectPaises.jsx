import React from 'react'
import { useRef, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { guardarPaises } from "../features/paisesSlice";

const selectPaises = ({ ref }) => {

    const dispatch = useDispatch();
    const paises = useSelector(state => state.paises.paises);

    useEffect(() => {
        fetch("https://movetrack.develotion.com/paises.php")
            .then((response) => response.json())
            .then((datos) => {
                dispatch(guardarPaises(datos.paises));
            })
    }, []);


    return (
        <select ref={ref}>
            {paises.map(objPais =>
                (<option key={objPais.id} value={objPais.id}>{objPais.name}</option>)
            )}
        </select>
    )
}

export default selectPaises
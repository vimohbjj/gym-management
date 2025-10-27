import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    sesiones: []
};

const sesionesSlice = createSlice({
    name: 'sesiones',
    initialState,
    reducers: {
        guardarSesiones: (state, action) => {
            state.sesiones = action.payload;
        },
        eliminarSesion:(state, action) => {
            state.sesiones = state.sesiones.filter(s => s.idRegistro !== action.payload);
        }, vaciarSesiones:(state) => {
            state.sesiones = [];
        }
    }
});

export const { guardarSesiones, eliminarSesion, vaciarSesiones } = sesionesSlice.actions;
export default sesionesSlice.reducer;
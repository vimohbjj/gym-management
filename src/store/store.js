import { configureStore } from '@reduxjs/toolkit';
import paisesSlice from '../features/paisesSlice';
import sesionesSlice from '../features/sesionesSlice';
import actividadesSlice from '../features/actividadesSlice';

export const store = configureStore({
    reducer: {
        paises: paisesSlice,
        sesiones: sesionesSlice,
        actividades: actividadesSlice
    }
});

export default store;
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    actividades: []
};

const actividadesSlice = createSlice({
    name: 'actividades',
    initialState,
    reducers: {
        guardarActividades: (state, action) => {
            state.actividades= action.payload;
        }
    }
});

export const { guardarActividades } = actividadesSlice.actions;
export default actividadesSlice.reducer;
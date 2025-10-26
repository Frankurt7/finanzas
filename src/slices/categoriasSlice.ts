import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ICategoria {
  id: number;
  nombre: string;
  icono: string;
}

interface CategoriasState {
  lista: ICategoria[];
  nextId: number;
}

const initialState: CategoriasState = {
  lista: [
    { id: 1, nombre: "Hogar", icono: "House" },
    { id: 2, nombre: "Comida", icono: "CupStraw" },
    { id: 3, nombre: "Transporte", icono: "CarFront" },
    { id: 4, nombre: "Salud", icono: "HeartPulse" },
    { id: 5, nombre: "Educación", icono: "Mortarboard" },
    { id: 6, nombre: "Trabajo", icono: "Briefcase" },
    { id: 7, nombre: "Ocio", icono: "Film" },
    { id: 8, nombre: "Compras", icono: "Bag" },
    { id: 9, nombre: "Finanzas", icono: "CreditCard" },
  ],
  nextId: 10,
};

const categoriasSlice = createSlice({
  name: "categorias",
  initialState,
  reducers: {
    agregarCategoria: (
      state,
      action: PayloadAction<Omit<ICategoria, "id">>
    ) => {
      state.lista.push({ ...action.payload, id: state.nextId });
      state.nextId++;
    },
    editarCategoria: (state, action: PayloadAction<ICategoria>) => {
      const idx = state.lista.findIndex((c) => c.id === action.payload.id);
      if (idx !== -1) state.lista[idx] = action.payload;
    },
    eliminarCategoria: (state, action: PayloadAction<number>) => {
      state.lista = state.lista.filter((c) => c.id !== action.payload);
    },
  },
});

export const { agregarCategoria, editarCategoria, eliminarCategoria } =
  categoriasSlice.actions;

export default categoriasSlice.reducer;

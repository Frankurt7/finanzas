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
    { id: 1, nombre: "Hogar", icono: "Home" },
    { id: 2, nombre: "Restaurantes", icono: "Salad" },
    { id: 3, nombre: "Cine", icono: "Ticket" },
  ],
  nextId: 4,
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

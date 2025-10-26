import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface ITransaction {
  id: string;
  monto: number;
  fecha: string;
  categoria: string;
  descripcion: string;
}

interface IFinancesState {
  transacciones: ITransaction[];
}

const initialState: IFinancesState = {
  transacciones: [],
};

const financesSlice = createSlice({
  name: "finances",
  initialState,
  reducers: {
    agregarTransaccion: (state, action: PayloadAction<ITransaction>) => {
      state.transacciones.push(action.payload);
    },
    eliminarTransaccion: (state, action: PayloadAction<string>) => {
      state.transacciones = state.transacciones.filter(
        (t) => t.id !== action.payload
      );
    },
  },
});

export const { agregarTransaccion, eliminarTransaccion } =
  financesSlice.actions;
export default financesSlice.reducer;

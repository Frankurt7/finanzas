import { Categorias, Gastos, Resumen, TotalGastos } from "pages";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BottomNav } from "shared/components";
import { Toaster } from "react-hot-toast";

import "./App.css"

export const App = () => {
  return (
    <BrowserRouter>
      <Toaster position="top-center" />
      <div className="app-container d-flex flex-column min-vh-100">
        {/* Contenido principal */}
        <div className="main-content flex-grow-1">
          <Routes>
            <Route path="/" element={<Resumen />} />
            <Route path="/gastos" element={<Gastos />} />
            <Route path="/categorias" element={<Categorias />} />
            <Route path="/gastosCompletos" element={<TotalGastos />} />
          </Routes>
        </div>

        <BottomNav />
      </div>
    </BrowserRouter>
  );
}

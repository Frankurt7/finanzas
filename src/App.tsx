import { Categorias, Gastos, Resumen } from "pages";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BottomNav } from "shared/components";
import TotalGastos from "pages/TotalGastos/TotalGastos";

import "./App.css"

function App() {
  return (
    <BrowserRouter>
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

export default App;
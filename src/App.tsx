import { Categorias, Gastos, Resumen, TotalGastos } from "pages";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { BottomNav, PageTransition } from "shared/components";
import { Toaster } from "react-hot-toast";
import { AnimatePresence } from "framer-motion";

import "./App.css";

import { NEUMORPHIC_TOAST_OPTIONS } from "./shared/styles/toast.constants";

const AppContent = () => {
  const location = useLocation();

  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={NEUMORPHIC_TOAST_OPTIONS}
      />
      <div className="app-container d-flex flex-column min-vh-100">
        <div className="main-content flex-grow-1" style={{ position: "relative", overflowX: "hidden" }}>
          <AnimatePresence mode="popLayout">
            <Routes location={location} key={location.pathname}>
              <Route
                path="/"
                element={<PageTransition><Resumen /></PageTransition>}
              />
              <Route
                path="/gastos"
                element={<PageTransition><Gastos /></PageTransition>}
              />
              <Route
                path="/categorias"
                element={<PageTransition><Categorias /></PageTransition>}
              />
              <Route
                path="/gastosCompletos"
                element={<PageTransition><TotalGastos /></PageTransition>}
              />
            </Routes>
          </AnimatePresence>
        </div>

        <BottomNav />
      </div>
    </>
  );
};

export const App = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

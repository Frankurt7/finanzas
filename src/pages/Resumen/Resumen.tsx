import { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container } from "react-bootstrap";
import { AppDispatch, RootState } from "store";
import { ListaTransacciones, Indicators, GraphsData } from "./components";
import { setSelectedDate } from "slices/filtersSlice";

export const Resumen = () => {
    const dispatch = useDispatch<AppDispatch>();
    const transacciones = useSelector(
        (state: RootState) => state.finances.transacciones
    );
    const { selectedMonth, selectedYear } = useSelector((state: RootState) => state.filters);

    const handleDateChange = (month: number, year: number) => {
        dispatch(setSelectedDate({ month, year }));
    };

    // Ordena las transacciones por fecha y toma las últimas 3
    const ultimasTransacciones = useMemo(() => {
        return [...transacciones]
            .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())
            .slice(0, 3);
    }, [transacciones]);

    const tieneTransacciones = transacciones.length > 0;

    return (
        <div style={{ padding: '1.5rem' }}>
            <Container fluid className="p-2 d-flex flex-column gap-5">
                <Indicators
                    transacciones={transacciones}
                    selectedMonth={selectedMonth}
                    selectedYear={selectedYear}
                    onDateChange={handleDateChange}
                />

                {tieneTransacciones ? (
                    <ListaTransacciones transacciones={ultimasTransacciones} />
                ) : (
                    <p className="text-center text-muted fst-italic mt-4">Aun no tiene gastos registrados</p>
                )}

                <GraphsData />
            </Container>
        </div>
    );
}

import { useMemo } from "react";
import { formatCurrency } from "shared/utils/number.utils";
import { CurrencyText } from "shared/components/CurrencyText/CurrencyText";
import { DatePicker } from "shared/components/DatePicker/DatePicker";
import { ITransaction } from "slices/financesSlice";
import "./Indicators.css";
import { getFontSizeForAmount } from "shared/utils/formatText.utils";
import { useCountUp } from "pages/TotalGastos/useCountUp";

interface IndicatorsProps {
    transacciones: ITransaction[];
    selectedMonth: number;
    selectedYear: number;
    onDateChange: (month: number, year: number) => void;
}

export const Indicators = ({ transacciones, selectedMonth, selectedYear, onDateChange }: IndicatorsProps) => {

    const totalGastos = useMemo(() => {
        const primerDiaMesSeleccionado = new Date(selectedYear, selectedMonth, 1);
        const ultimoDiaMesSeleccionado = new Date(selectedYear, selectedMonth + 1, 0);

        return transacciones
            .filter(t => {
                const fechaTransaccion = new Date(t.fecha);
                return fechaTransaccion >= primerDiaMesSeleccionado && fechaTransaccion <= ultimoDiaMesSeleccionado;
            })
            .reduce((acc, t) => acc + t.monto, 0);
    }, [transacciones, selectedMonth, selectedYear]);

    const handleDateSelect = (date: Date | null) => {
        if (date) {
            onDateChange(date.getMonth(), date.getFullYear());
        }
    };

    const startDate = new Date(selectedYear, selectedMonth);

    const animatedTotal = useCountUp(totalGastos);
    const formattedTotalGastos = formatCurrency(animatedTotal);

    return (
        <div className="d-flex justify-content-center">
            <div className="total-gastos-panel">
                <div className="d-flex flex-row align-items-center justify-content-center gap-2 mb-2">
                    <span className="total-gastos-label">Gastos de</span>
                    <DatePicker
                        selected={startDate}
                        onChange={handleDateSelect}
                        dateFormat="LLLL yyyy"
                        showMonthYearPicker
                    />
                </div>
                <h1 className="total-gastos-amount" style={{ fontSize: getFontSizeForAmount(formattedTotalGastos) }}>
                    <CurrencyText
                        slashClassName="total-gastos-slash" />
                    {formattedTotalGastos}
                </h1>
            </div>
        </div>
    );
};

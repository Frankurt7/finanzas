/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Line } from 'react-chartjs-2';
import { formatCurrency } from 'shared/utils/number.utils';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { RootState } from 'store';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const GastosLineChart = () => {
    const transacciones = useSelector((state: RootState) => state.finances.transacciones);

    const data = useMemo(() => {
        const labels: string[] = [];
        const dataPoints: number[] = [];
        const hoy = new Date();

        for (let i = 5; i >= 0; i--) {
            const fecha = new Date(hoy.getFullYear(), hoy.getMonth() - i, 1);
            const mes = fecha.toLocaleString('es-ES', { month: 'short' });
            labels.push(`${mes.charAt(0).toUpperCase() + mes.slice(1)}.`);

            const primerDiaMes = new Date(fecha.getFullYear(), fecha.getMonth(), 1);
            const ultimoDiaMes = new Date(fecha.getFullYear(), fecha.getMonth() + 1, 0);

            const gastosDelMes = transacciones
                .filter(t => {
                    const fechaTransaccion = new Date(t.fecha);
                    return fechaTransaccion >= primerDiaMes && fechaTransaccion <= ultimoDiaMes;
                })
                .reduce((acc, t) => acc + t.monto, 0);

            dataPoints.push(gastosDelMes);
        }

        return {
            labels,
            datasets: [{
                label: 'Gastos Totales',
                data: dataPoints,
                borderColor: 'rgba(155, 155, 155, 1)',
                tension: 0.2
            }]
        };
    }, [transacciones]);

    const options = {
        responsive: true,
        plugins: {
            legend: { display: false },
            tooltip: {
                callbacks: {
                    label: function (context: any) {
                        const value = context.parsed.y;
                        return `S/ ${formatCurrency(value)}`;
                    },
                },
            },
        },
    };
    return <Line options={options} data={data} />;
};
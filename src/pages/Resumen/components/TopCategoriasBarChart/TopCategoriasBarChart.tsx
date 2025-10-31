/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { RootState } from 'store';
import { formatCurrency } from 'shared/utils/number.utils';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const TopCategoriasBarChart = () => {
    const transacciones = useSelector((state: RootState) => state.finances.transacciones);

    const data = useMemo(() => {
        const hoy = new Date();
        const finPeriodoTotal = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0);
        const inicioPeriodoTotal = new Date(hoy.getFullYear(), hoy.getMonth() - 5, 1); // 6 meses atrás

        // 1. Encontrar el Top 5 de categorías en los últimos 6 meses
        const gastosTotalesCategoria: { [key: string]: number } = {};
        transacciones.forEach(t => {
            const fechaTransaccion = new Date(t.fecha);
            if (fechaTransaccion >= inicioPeriodoTotal && fechaTransaccion <= finPeriodoTotal) {
                gastosTotalesCategoria[t.categoria] = (gastosTotalesCategoria[t.categoria] || 0) + t.monto;
            }
        });

        const top5Categorias = Object.entries(gastosTotalesCategoria)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 3)
            .map(([nombre]) => nombre);

        // 2. Preparar datos para el gráfico de barras para los últimos 6 meses
        const labels: string[] = [];
        const colorPalette = [
            'rgba(107, 142, 184, 0.7)', // Muted Blue
            'rgba(215, 138, 109, 0.7)', // Muted Terracotta
            'rgba(161, 147, 194, 0.7)', // Muted Lavender
        ];
        const datasets = top5Categorias.map((categoria, index) => ({
            label: categoria,
            data: [] as number[],
            backgroundColor: colorPalette[index % colorPalette.length],
        }));

        for (let i = 5; i >= 0; i--) {
            const fecha = new Date(hoy.getFullYear(), hoy.getMonth() - i, 1);
            const mesLabel = fecha.toLocaleString('es-ES', { month: 'short' });
            labels.push(`${mesLabel.charAt(0).toUpperCase() + mesLabel.slice(1)}.`);

            const primerDiaMes = new Date(fecha.getFullYear(), fecha.getMonth(), 1);
            const ultimoDiaMes = new Date(fecha.getFullYear(), fecha.getMonth() + 1, 0);

            const gastosDelMes = transacciones.filter(t => {
                const fechaTransaccion = new Date(t.fecha);
                return fechaTransaccion >= primerDiaMes && fechaTransaccion <= ultimoDiaMes;
            });

            datasets.forEach(dataset => {
                const gastoCategoria = gastosDelMes
                    .filter(t => t.categoria === dataset.label)
                    .reduce((acc, t) => acc + t.monto, 0);
                dataset.data.push(gastoCategoria);
            });
        }

        return {
            labels,
            datasets
        };
    }, [transacciones]);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom' as const,
            },
            tooltip: {
                callbacks: {
                    label: function (context: any) {
                        const value = context.parsed.y;
                        return `S/ ${formatCurrency(value)}`;
                    },
                },
            },
            title: {
                display: false,
            },
            customCanvasBackgroundColor: {
                color: 'transparent',
            }
        },
        scales: {
            x: {
                stacked: false,
            },
            y: {
                stacked: false,
            },
        },
        categoryPercentage: 0.8, // Aumenta el espacio que ocupa el grupo de barras de cada mes
        barPercentage: 0.9,      // Aumenta el ancho de cada barra individual dentro del grupo
    };

    return (
        <div style={{ height: '230px' }}>
            <Bar options={options} data={data} />
        </div>
    );
};
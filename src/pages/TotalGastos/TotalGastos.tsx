import { useState, useMemo, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { ICategoria } from "slices/categoriasSlice";
import { ITransaction } from "slices/financesSlice";
import { TransaccionItem } from "pages/Resumen/components/ListaTransacciones/components";
import "pages/Resumen/components/ListaTransacciones/ListaTransacciones.css";
import "./TotalGastos.css";
import { DateRange, DateRangeFilter, CurrencyText } from "shared/components";
import { getFontSizeForAmount } from "shared/utils/formatText.utils";
import { formatCurrency } from "shared/utils/number.utils";
import { useCountUp } from "./useCountUp";
import { iconOptions } from "pages/Categorias/components/IconOptions";
import { useNotifications } from "shared/hooks/useNotifications";

export const TotalGastos = () => {
    const allTransactions = useSelector(
        (state: RootState) => state.finances.transacciones
    );
    const allCategories = useSelector(
        (state: RootState) => state.categorias.lista
    );
    const [filter, setFilter] = useState<DateRange>("all");
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const { permission, requestNotificationPermission } = useNotifications();

    const existingCategories = useMemo(() => {
        const categoriesInTransactions = new Set(allTransactions.map(t => t.categoria));
        return allCategories.filter(c => categoriesInTransactions.has(c.nombre));
    }, [allTransactions, allCategories]);

    // Establecer todas las categorías como seleccionadas por defecto
    useEffect(() => {
        if (existingCategories.length > 0) {
            setSelectedCategories(existingCategories.map(c => c.nombre));
        }
    }, [allTransactions, allCategories, existingCategories]); // Se recalcula si cambian las transacciones o categorías base

    const getIconComponent = (iconName: string) => {
        const iconOption = iconOptions.find(opt => opt.value === iconName);
        if (iconOption) {
            const Icon = iconOption.icon;
            return <Icon size={20} />;
        }
        return null;
    };
    const handleCategoryToggle = (category: string) => {
        setSelectedCategories(prev =>
            prev.includes(category)
                ? prev.filter(c => c !== category)
                : [...prev, category]
        );
    };

    const filteredTransactions = useMemo(() => {
        const now = new Date();
        // Normalizamos 'today' para que sea el inicio del día actual en la zona horaria local.
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

        // 1. Filtrar por rango de fechas
        let dateFilteredTransactions: ITransaction[];
        switch (filter) {
            case "today":
                dateFilteredTransactions = allTransactions.filter(
                    (t) => new Date(`${t.fecha}T00:00:00`) >= today
                );
                break;
            case "week":
                {
                    const dayOfWeek = today.getDay(); // 0 (Dom) - 6 (Sáb)
                    // Ajustamos para que la semana empiece en Lunes (1). Si es Domingo (0), retrocedemos 6 días.
                    const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
                    const startOfWeek = new Date(today);
                    startOfWeek.setDate(today.getDate() + diff);
                    dateFilteredTransactions = allTransactions.filter(
                        (t) => new Date(`${t.fecha}T00:00:00`) >= startOfWeek
                    );
                    break;
                }
            case "month":
                {
                    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
                    dateFilteredTransactions = allTransactions.filter(
                        (t) => new Date(`${t.fecha}T00:00:00`) >= startOfMonth
                    );
                    break;
                }
            case "all":
            default:
                dateFilteredTransactions = allTransactions;
                break;
        }
        // 2. Filtrar por categorías seleccionadas
        // Si no hay categorías seleccionadas, no mostramos nada (en lugar de todo).
        // El estado inicial ahora las selecciona todas, por lo que el usuario ve todo al principio.
        if (selectedCategories.length === 0) {
            return [];
        }

        return dateFilteredTransactions.filter(t => selectedCategories.includes(t.categoria));
    }, [allTransactions, filter, selectedCategories]);

    const totalGastos = useMemo(() =>
        filteredTransactions.reduce((acc, t) => acc + t.monto, 0),
        [filteredTransactions]);
    const animatedTotal = useCountUp(totalGastos);
    const formattedTotalGastos = formatCurrency(animatedTotal);

    const groupedTransactions = useMemo(() => {
        const groups: { [key: string]: ITransaction[] } = {};

        // Ordenar transacciones por fecha descendente antes de agrupar
        const sortedTransactions = [...filteredTransactions].sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());

        sortedTransactions.forEach(t => {
            const date = new Date(`${t.fecha}T00:00:00`);
            // Usamos toLocaleDateString para obtener una clave de fecha sin la hora
            const dateKey = date.toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' });
            if (!groups[dateKey]) {
                groups[dateKey] = [];
            }
            groups[dateKey].push(t);
        });
        return groups;
    }, [filteredTransactions]);

    return (
        <div className="page-container">
            <div className="neumorphic-form-container">
                <h4 className="neumorphic-form-title">Listado de Gastos</h4>

                <div className="total-gastos-content">
                    <DateRangeFilter onFilterChange={setFilter} />

                    <div className="category-filter-container mt-3">
                        {existingCategories.map((category: ICategoria) => (
                            <button
                                key={category.id}
                                onClick={() => handleCategoryToggle(category.nombre)}
                                className={`neumorphic-button-sm ${selectedCategories.includes(category.nombre) ? 'active' : ''}`}
                            >
                                {getIconComponent(category.icono)}
                            </button>
                        ))}
                    </div>


                    <h1 className=" text-center total-gastos-amount mb-3" style={{ fontSize: getFontSizeForAmount(formattedTotalGastos) }}>
                        <CurrencyText
                            slashClassName="total-gastos-slash" />
                        {formattedTotalGastos}
                    </h1>

                    {permission === "default" && (
                        <div className="d-flex justify-content-center mb-3">
                            <button className="neumorphic-button" onClick={requestNotificationPermission}>
                                Activar Recordatorios
                            </button>
                        </div>
                    )}


                    <div className="lista-transacciones-neumorph custom-scrollbar-hidden">
                        {Object.keys(groupedTransactions).length > 0 ? (
                            Object.entries(groupedTransactions).map(([dateKey, transactions]) => {
                                const date = new Date(`${transactions[0].fecha}T00:00:00`);
                                const formattedDate = date.toLocaleDateString('es-ES', {
                                    day: '2-digit', month: 'short', year: 'numeric'
                                }).replace('.', '');

                                const totalDelDia = transactions.reduce((sum, t) => sum + t.monto, 0);

                                return (
                                    <div key={dateKey} className="transaction-group">
                                        <div className="transaction-group-header">
                                            <h5 className="transaction-group-date">{formattedDate}</h5>
                                            <span className="transaction-group-total"><CurrencyText />{formatCurrency(totalDelDia)} </span>
                                        </div>
                                        {transactions.map(t => <TransaccionItem key={t.id} transaccion={t} />)}
                                    </div>
                                );
                            })
                        ) : (
                            <p className="no-transactions-message">No hay gastos en este período.</p>
                        )}
                    </div>
                </div>
            </div>

        </div>
    );
}

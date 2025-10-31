import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ITransaction, eliminarTransaccion } from 'slices/financesSlice';
import { formatCurrency } from 'shared/utils/number.utils';
import { CurrencyText } from 'shared/components';
import { TagFill, Trash } from 'react-bootstrap-icons';
import { getIconComponent } from 'pages/Categorias/components';
import { AppDispatch, RootState } from 'store';
import './TransaccionItem.css';

interface TransaccionItemProps {
    transaccion: ITransaction;
}

export const TransaccionItem = ({ transaccion }: TransaccionItemProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const categorias = useSelector((state: RootState) => state.categorias.lista);

    const categoriaActual = categorias.find(c => c.nombre === transaccion.categoria);
    const IconoCategoria = categoriaActual ? getIconComponent(categoriaActual.icono) : TagFill;

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const userTimezoneOffset = date.getTimezoneOffset() * 60000;
        const localDate = new Date(date.getTime() + userTimezoneOffset);
        const day = localDate.getDate();
        const month = localDate.toLocaleString("es-ES", { month: "long" });
        const year = localDate.getFullYear();
        return `${day} de ${month.charAt(0).toUpperCase() + month.slice(1)} ${year}`;
    };

    const handleToggle = () => setIsOpen(!isOpen);

    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        dispatch(eliminarTransaccion(transaccion.id));
    };

    return (
        <div className="transaccion-item-wrapper" onClick={handleToggle}>
            {isOpen ? (
                <div className={`transaccion-expanded-card`}>
                    <div className="expanded-header">
                        <div className="category-container">
                            <div className="icon-wrapper">
                                {IconoCategoria && <IconoCategoria size={20} />}
                            </div>
                            <span className="category">{transaccion.categoria}</span>
                        </div>
                    </div>
                    {transaccion.descripcion && <p className="description-expanded">{transaccion.descripcion}</p>}
                    <div className="separator"></div>
                    <div className="amount-expanded">
                        <CurrencyText />{formatCurrency(transaccion.monto)}
                    </div>
                    <div className="expanded-footer">
                        <div className="date-expanded">{formatDate(transaccion.fecha)}</div>
                        <button className="delete-button neumorphic-button" onClick={handleDelete} title="Eliminar transacción">
                            <Trash size={18} />
                        </button>
                    </div>
                </div>
            ) : (
                <div className="transaccion-collapsed-neumorph">
                    <div className="d-flex align-items-center overflow-hidden" style={{ gap: '0.75rem' }}>
                        {IconoCategoria && <IconoCategoria size={18} className="flex-shrink-0" />}
                        <span className="description">{transaccion.descripcion || transaccion.categoria}</span>
                    </div>
                    <span className={`transaccion-item-amount`}><CurrencyText />{formatCurrency(transaccion.monto)}</span>
                </div>
            )}
        </div>
    );
}

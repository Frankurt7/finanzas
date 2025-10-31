import { ITransaction } from "slices/financesSlice";
import { TransaccionItem } from "./components";
import { Link } from "react-router-dom";
import "./ListaTransacciones.css";

interface IListaTransaccionesPorps {
    transacciones: Array<ITransaction>
}

export const ListaTransacciones = ({ transacciones }: IListaTransaccionesPorps) => {
    return (
        <div className="lista-transacciones-container">
            <div className="lista-transacciones-header">
                <h4>Ultimos gastos</h4>
                <Link to="/gastosCompletos" className="ver-mas-link">Ver todos</Link>
            </div>
            <div className="lista-transacciones-neumorph custom-scrollbar-hidden">
                {transacciones.map((t) => (
                    <TransaccionItem key={t.id} transaccion={t} />
                ))}
            </div>
        </div>
    )
}

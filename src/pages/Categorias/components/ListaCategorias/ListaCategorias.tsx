import { Pencil, Trash } from "react-bootstrap-icons";
import { ICategoria } from "slices/categoriasSlice";
import "./ListaCategorias.css";
import { getIconComponent } from "../IconOptions/icon-options";

interface ListaCategoriasProps {
    categorias: ICategoria[];
    editando: number | null;
    onEdit: (categoria: ICategoria) => void;
    onDelete: (id: number) => void;
}

export default function ListaCategorias({ categorias, editando, onEdit, onDelete }: ListaCategoriasProps) {
    return (
        <div className="lista-categorias-container">
            <h5 className="mb-3">Lista de categorías</h5>
            <div className="lista-categorias-neumorph">
                {categorias.map((c) => {
                    const Icono = getIconComponent(c.icono);

                    return (
                        <div
                            key={c.id}
                            className={`categoria-item-neumorph ${editando === c.id ? "editando" : ""}`}>
                            <div className="categoria-info">
                                {Icono && <Icono size={20} className="me-2" />}
                                <span className="fw-semibold">{c.nombre}</span>
                            </div>
                            <div className="categoria-actions">
                                <button className="neumorphic-icon-button" onClick={() => onEdit(c)} title="Editar">
                                    <Pencil size={18} />
                                </button>
                                <button className="neumorphic-icon-button" onClick={() => onDelete(c.id)} title="Eliminar">
                                    <Trash size={18} />
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { editarCategoria, agregarCategoria, eliminarCategoria, ICategoria } from "slices/categoriasSlice";
import { RootState, AppDispatch } from "store";
import { ListaCategorias, CategoryForm } from "./components";
import "styles/neumorphic-form.css";

function Categorias() {
    const dispatch = useDispatch<AppDispatch>();
    const categorias = useSelector((state: RootState) => state.categorias.lista);

    const [editando, setEditando] = useState<number | null>(null);

    const handleSubmit = (data: { nombre: string; icono: string }) => {
        const { nombre, icono } = data;

        if (editando !== null) {
            dispatch(editarCategoria({ id: editando, nombre, icono }));
        } else {
            dispatch(agregarCategoria({ nombre, icono }));
        }

        limpiarFormulario();
    };

    const handleEdit = (categoria: ICategoria) => {
        setEditando(categoria.id);
    };

    const handleDelete = (id: number) => {
        dispatch(eliminarCategoria(id));
    };

    const limpiarFormulario = () => {
        setEditando(null);
    };

    const categoriaEnEdicion = editando !== null ? categorias.find(c => c.id === editando) : null;

    return (
        <div className="neumorphic-form-container">
            <h4 className="neumorphic-form-title">Categorías</h4>

            <CategoryForm
                onSubmit={handleSubmit}
                onCancel={limpiarFormulario}
                initialData={categoriaEnEdicion}
            />

            <hr style={{ margin: "2rem 0" }} />

            <ListaCategorias
                categorias={categorias}
                editando={editando}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
        </div>
    );
}

export default Categorias;

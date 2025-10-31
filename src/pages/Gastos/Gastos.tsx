import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { format } from "date-fns";
import Select from "react-select";
import { agregarTransaccion } from "slices/financesSlice";
import { AppDispatch, RootState } from "store";
import { DatePicker } from "shared/components";
import toast from "react-hot-toast";

export const Gastos = () => {
    const dispatch = useDispatch<AppDispatch>();
    const categorias = useSelector((state: RootState) => state.categorias.lista);

    const [monto, setMonto] = useState("");
    const [fecha, setFecha] = useState(format(new Date(), "yyyy-MM-dd"));
    const [categoria, setCategoria] = useState("");
    const [descripcion, setDescripcion] = useState("");

    const categoriasGasto = categorias
        .map((c) => ({
            value: c.nombre,
            label: c.nombre,
        }));

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!monto || !fecha || !categoria) return;

        dispatch(
            agregarTransaccion({
                id: uuidv4(),
                monto: parseFloat(monto),
                fecha,
                categoria,
                descripcion,
            })
        );

        toast.success("Se registró exitosamente");

        setMonto("");
        setFecha("");
        setCategoria("");
        setDescripcion("");
    };

    return (
        <div className="full-height-form">
            <div className="neumorphic-form-container">
                <h4 className="neumorphic-form-title">Registrar Gasto</h4>
                <form onSubmit={handleSubmit} className="d-flex flex-column flex-grow-1">
                    <div className="neumorphic-form-group">
                        <label className="neumorphic-label">Monto</label>
                        <input
                            type="number"
                            value={monto}
                            onChange={(e) => setMonto(e.target.value)}
                            placeholder="0.00"
                            required
                            className="neumorphic-input"
                        />
                    </div>

                    <div className="neumorphic-form-group">
                        <label className="neumorphic-label">Fecha</label>
                        <DatePicker
                            selected={fecha ? new Date(fecha + "T00:00:00") : null}
                            onChange={(date) =>
                                setFecha(date ? format(date, "yyyy-MM-dd") : "")
                            }
                            dateFormat="dd/MMM/yy"
                            required
                            className="sunken"
                        />
                    </div>

                    <div className="neumorphic-form-group">
                        <label className="neumorphic-label">Categoría</label>
                        <div className="neumorphic-select">
                            <Select
                                options={categoriasGasto}
                                value={categoriasGasto.find((opt) => opt.value === categoria) || null}
                                onChange={(opt) => setCategoria(opt?.value || "")}
                                placeholder="Seleccione una categoría"
                                classNamePrefix="Select"
                            />
                        </div>
                    </div>

                    <div className="neumorphic-form-group">
                        <label className="neumorphic-label">Descripción</label>
                        <textarea
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                            rows={2}
                            className="neumorphic-textarea"
                        />
                    </div>

                    <button type="submit" className="neumorphic-button mt-auto">
                        Guardar Gasto
                    </button>
                </form>
            </div>
        </div>
    );
}

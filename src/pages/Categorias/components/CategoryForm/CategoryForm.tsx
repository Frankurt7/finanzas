/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef } from "react"; // Importa useRef
import Select, { components, SingleValue } from "react-select";
import { ICategoria } from "slices/categoriasSlice";
import "./CategoryForm.css";
import { IconOption, iconOptions } from "../IconOptions/icon-options";

interface CategoryFormProps {
    onSubmit: (data: { nombre: string; icono: string }) => void;
    onCancel: () => void;
    initialData?: ICategoria | null;
}

export const CategoryForm = ({ onSubmit, onCancel, initialData }: CategoryFormProps) => {
    const [nombre, setNombre] = useState("");
    const [icono, setIcono] = useState<IconOption>(iconOptions[0]); // Default icon
    const submitButtonRef = useRef<HTMLButtonElement>(null); // Crea un ref para el botón de submit

    useEffect(() => {
        if (initialData) {
            setNombre(initialData.nombre);
            const initialIcon = iconOptions.find(opt => opt.value === initialData.icono) || iconOptions[0];
            setIcono(initialIcon);
        } else {
            setNombre("");
            setIcono(iconOptions[0]);
        }
    }, [initialData]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ nombre, icono: icono.value });
        // Limpiar el formulario solo si no estamos editando
        if (!initialData) {
            setNombre("");
            setIcono(iconOptions[0]);
        }
        // Quita el foco del botón después de la acción
        // Usamos un setTimeout para asegurar que el blur se ejecute después del ciclo de renderizado del navegador.
        setTimeout(() => {
            if (submitButtonRef.current) {
                submitButtonRef.current.blur();
            }
        }, 75);
    };

    const customStyles = {
        control: (provided: any) => ({
            ...provided,
            backgroundColor: 'var(--background-color)',
            border: 'none',
            boxShadow: 'inset 5px 5px 10px #d9d9d9, inset -5px -5px 10px #ffffff',
            borderRadius: '12px',
            minHeight: '55px',
            height: '55px', // Misma altura que el input
        }),
        singleValue: (provided: any) => ({
            ...provided,
            color: '#333', // Color del icono seleccionado
            display: 'flex',
            justifyContent: 'center', // Centrado horizontal
            alignItems: 'center', // Centrado vertical
            width: '100%',
        }),
        menu: (provided: any) => ({
            ...provided,
            borderRadius: '12px',
            backgroundColor: '#fff', // Fondo blanco sólido para evitar transparencias
            boxShadow: '5px 5px 10px #d9d9d9, -5px -5px 10px #ffffff',
            border: 'none',
        }),
        option: (provided: any, state: { isSelected: any; isFocused: any; }) => ({
            ...provided,
            backgroundColor: state.isSelected ? 'var(--primary-color)' : state.isFocused ? '#e6e6e6' : 'transparent',
            color: state.isSelected ? 'black' : '#333',
        }),
        indicatorSeparator: () => ({ display: 'none' }),
    };

    const formatOptionLabel = ({ icon: Icon }: IconOption) => (
        <div className="d-flex justify-content-center align-items-center">
            <Icon size={20} />
        </div>
    );

    const SingleValue = ({ children, ...props }: any) => (
        <components.SingleValue {...props}>
            <props.data.icon size={20} />
        </components.SingleValue>
    );

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <div className="d-flex align-items-start" style={{ gap: '0.5rem' }}>
                {/* Icon Select */}
                <div style={{ flex: '2' }}>
                    <Select
                        options={iconOptions}
                        value={icono}
                        onChange={(opt: SingleValue<IconOption>) => setIcono(opt as IconOption)}
                        classNamePrefix="Select"
                        formatOptionLabel={formatOptionLabel}
                        components={{ SingleValue, DropdownIndicator: null }}
                        styles={customStyles}
                        isSearchable={false}
                    />
                </div>

                {/* Name Input */}
                <div style={{ flex: '10' }}>
                    <input
                        type="text"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                        className="neumorphic-input"
                        placeholder="Nombre de la categoría"
                    />
                </div>
            </div>

            <div className="mt-3 d-flex gap-2">
                <button
                    type="submit"
                    className="neumorphic-button"
                    ref={submitButtonRef} // Asigna el ref al botón
                >
                    {initialData ? "Guardar" : "Agregar"}
                </button>

                {initialData && (
                    <button type="button" className="neumorphic-button" onClick={onCancel}>
                        Cancelar
                    </button>
                )}
            </div>
        </form>
    );
};
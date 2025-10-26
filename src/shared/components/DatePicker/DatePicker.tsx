import React from "react";
import ReactDatePicker, {
    registerLocale,
    DatePickerProps,
} from "react-datepicker";
import { es } from "date-fns/locale/es";
import "react-datepicker/dist/react-datepicker.css";
import "./DatePicker.css";

registerLocale("es", es);

interface CustomDatePickerProps {
    selected: Date | null | undefined;
    onChange: (date: Date | null) => void;
    dateFormat?: string;
    showMonthYearPicker?: boolean;
    required?: boolean;
    className?: string;
}

export const DatePicker: React.FC<CustomDatePickerProps> = ({
    className,
    ...props
}) => {
    return (
        <ReactDatePicker
            locale="es"
            portalId="root-portal"
            onFocus={(e) => ((e.target as HTMLInputElement).readOnly = true)}
            className={`neumorphic-datepicker-input ${className || ""}`}
            {...(props as DatePickerProps)}
        />
    );
};
import {
    LucideIcon, // Import LucideIcon type
    Coins,
    Footprints, // Changed Run to Footprints
    Home,
    Utensils,
    Car,
    HeartPulse,
    GraduationCap,
    Briefcase,
    Ticket,
    ShoppingBag,
    CreditCard,
    Heart,
    PiggyBank,
    Dumbbell,
    AlertTriangle,
    Gift,
    Smartphone,
    Shirt,
    Fuel,
    Salad, // Add Salad icon
} from "lucide-react";

export interface IconOption {
    value: string;
    icon: LucideIcon;
}

// Mapeo de nombres de íconos a sus componentes para una búsqueda fácil.
const iconMap: { [key: string]: LucideIcon } = {
    "Home": Home,
    "Utensils": Utensils,
    "Car": Car,
    "HeartPulse": HeartPulse,
    "GraduationCap": GraduationCap,
    "Briefcase": Briefcase,
    "Ticket": Ticket,
    "ShoppingBag": ShoppingBag,
    "CreditCard": CreditCard,
    "Heart": Heart,
    "PiggyBank": PiggyBank,
    "Dumbbell": Dumbbell,
    "AlertTriangle": AlertTriangle,
    "Gift": Gift,
    "Smartphone": Smartphone,
    "Shirt": Shirt,
    "Fuel": Fuel,
    "Salad": Salad,
    "Coins": Coins,
    "Footprints": Footprints, // Changed Run to Footprints
};

export const getIconComponent = (iconName: string): LucideIcon | null => {
    return iconMap[iconName] || null;
};

// Lista de íconos disponibles para seleccionar en el formulario.
export const iconOptions: IconOption[] = [
    {
        value: "Home",
        icon: Home, // Hogar y servicios
    },
    {
        value: "Utensils",
        icon: Utensils, // Comidas y bebidas
    },
    {
        value: "Car",
        icon: Car, // Transporte
    },
    {
        value: "HeartPulse",
        icon: HeartPulse, // Salud
    },
    {
        value: "GraduationCap",
        icon: GraduationCap, // Educación
    },
    {
        value: "Briefcase",
        icon: Briefcase, // Trabajo / Negocios
    },
    {
        value: "Ticket",
        icon: Ticket, // Entretenimiento y ocio
    },
    {
        value: "ShoppingBag",
        icon: ShoppingBag, // Compras personales
    },
    {
        value: "CreditCard",
        icon: CreditCard, // Finanzas / Deudas
    },
    {
        value: "Heart",
        icon: Heart, // Familia y relaciones
    },
    {
        value: "PiggyBank",
        icon: PiggyBank, // Ahorro e inversión
    },
    {
        value: "Dumbbell",
        icon: Dumbbell, // Cuidado personal
    },
    {
        value: "AlertTriangle",
        icon: AlertTriangle, // Emergencias / Imprevistos
    },
    {
        value: "Gift",
        icon: Gift, // Donaciones / Caridad
    },
    {
        value: "Smartphone",
        icon: Smartphone, // Suscripciones y servicios digitales
    },
    {
        value: "Shirt",
        icon: Shirt, // Ropa
    },
    {
        value: "Fuel",
        icon: Fuel, // Combustible
    },
    {
        value: "Salad",
        icon: Salad, // Comida / Restaurante
    },
    {
        value: "Coins",
        icon: Coins, // Monedas
    },
    {
        value: "Footprints", // Changed Run to Footprints
        icon: Footprints, // Ejercicio / Correr
    },

];

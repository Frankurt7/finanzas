import {
  HouseDoorFill,
  GridFill,
  PlusCircleFill,
  JournalBookmarkFill,
} from "react-bootstrap-icons";
import BottomNavItem from "./components/BottomNavItem";
import "./BottomNav.css";

const navItems = [
  {
    to: "/",
    label: "Resumen",
    icon: <HouseDoorFill size={22} />,
    activeColor: "var(--balance-color)",
  },
  {
    to: "/gastos",
    label: "Registrar",
    icon: <PlusCircleFill size={22} className="gastos-icon" />,
    activeColor: "var(--gastos-color)",
  },
  {
    to: "/gastosCompletos",
    label: "Gastos",
    icon: <JournalBookmarkFill size={22} />,
    activeColor: "var(--listado-color)",
  },
  {
    to: "/categorias",
    label: "Categorías",
    icon: <GridFill size={22} />,
    activeColor: "var(--categorias-color)",
  },
];

export default function BottomNav() {
  return (
    <nav className="bottom-nav-neumorph">
      {navItems.map((item) => (
        <BottomNavItem
          key={item.to}
          to={item.to}
          label={item.label}
          icon={item.icon}
          activeColor={item.activeColor}
        />
      ))}

    </nav>
  );
}
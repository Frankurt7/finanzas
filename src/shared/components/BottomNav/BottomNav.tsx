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
    activeColor: "70BBDD",
  },
  {
    to: "/gastos",
    label: "Registrar",
    icon: <PlusCircleFill size={22} className="gastos-icon" />,
    activeColor: "70BBDD",
  },
  {
    to: "/gastosCompletos",
    label: "Gastos",
    icon: <JournalBookmarkFill size={22} />,
    activeColor: "70BBDD",
  },
  {
    to: "/categorias",
    label: "Categorías",
    icon: <GridFill size={22} />,
    activeColor: "70BBDD",
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
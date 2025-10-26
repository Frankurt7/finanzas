/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { NavLink } from "react-router-dom";
import "./BottomNavItem.css";

interface BottomNavItemProps {
  to: string;
  label: string;
  icon: React.ReactNode;
  activeColor: string; // e.g., '#0d6efd'
}

export default function BottomNavItem({ to, label, icon, activeColor }: BottomNavItemProps) {
  return (
    <NavLink
      to={to}
      end={to === "/"}
      className="bottom-nav-item-neumorph"
    >
      {({ isActive }) => (
        <>
          {React.cloneElement(icon as React.ReactElement<any>, {
            style: { color: isActive ? activeColor : undefined },
          })}
          <div>{label}</div>
        </>
      )}
    </NavLink>
  );
}

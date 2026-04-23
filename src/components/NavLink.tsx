import { NavLink as RRNavLink } from "react-router-dom";
import type { ReactNode } from "react";

export const NavLink = ({
  to,
  children,
  highlight = false,
  className = "",
}: {
  to: string;
  children: ReactNode;
  highlight?: boolean;
  className?: string;
}) => {
  return (
    <RRNavLink
      to={to}
      className={({ isActive }) =>
        `px-3 py-2 rounded-md transition-colors ${
          highlight ? "text-purple-400" : ""
        } ${isActive ? "font-semibold" : ""} ${className}`
      }
    >
      {children}
    </RRNavLink>
  );
};

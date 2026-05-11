import { NavLink } from "react-router";
import { NavLink as NavLinkItem } from "../../constants/navLinks";

interface NavListProps {
  navLinks: NavLinkItem[];
}

export default function NavList({ navLinks }: NavListProps) {
  const navLinkClassName = ({ isActive }: { isActive: boolean }) =>
    `flex gap-2 items-center hover:bg-[#101112] duration-200 p-2.5 -ml-1.5 rounded-xl ${
      isActive ? "bg-[#101112] glass-nav-active" : ""
    }`;

  return (
    <ul className="flex flex-col gap-1">
      {navLinks.map((link) => (
        <NavLink key={link.to} to={link.to} className={navLinkClassName}>
          {({ isActive }) => (
            <>
              <link.icon
                size={28}
                className={isActive ? "text-donathell-main" : ""}
              />
              {link.label}
            </>
          )}
        </NavLink>
      ))}
    </ul>
  );
}

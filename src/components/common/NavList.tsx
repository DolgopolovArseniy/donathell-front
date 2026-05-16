import { NavLink } from "react-router";
import { NavLink as NavLinkItem } from "../../constants/navLinks";

interface NavListProps {
  navLinks: NavLinkItem[];
  isMobile?: boolean;
}

export default function NavList({ navLinks, isMobile }: NavListProps) {
  const navLinkClassName = ({ isActive }: { isActive: boolean }) =>
    `flex items-center justify-center duration-200 rounded-xl font-medium transition-colors cursor-pointer ${
      isMobile 
        ? "flex-col gap-1 px-4 py-2 text-xs w-full" 
        : "gap-2 px-4 py-2 text-sm hover:bg-white/5"
    } ${
      isActive 
        ? "bg-white/5 glass-nav-active text-white" 
        : "text-[#888]"
    }`;

  return (
    <ul className={`flex items-center ${isMobile ? "w-full justify-around" : "gap-2 flex-row"}`}>
      {navLinks.map((link) => (
        <NavLink key={link.to} to={link.to} className={navLinkClassName}>
          {({ isActive }) => (
            <>
              <link.icon
                size={isMobile ? 24 : 20}
                className={isActive ? "text-donathell-main" : ""}
              />
              <span className={isMobile ? "text-[10px] tracking-wide" : ""}>{link.label}</span>
            </>
          )}
        </NavLink>
      ))}
    </ul>
  );
}

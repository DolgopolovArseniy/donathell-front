import { Link } from "react-router";
import { useAuth } from "../../context/AuthContext";
import { useClickOutside } from "../../hooks/useClickOutside";
import { ChevronDown, LogOut, PanelTop, Settings2 } from "lucide-react";

interface HeaderProps {
  isAuthenticated?: boolean;
}

export default function Header({ isAuthenticated = false }: HeaderProps) {
  const className =
    "flex items-center justify-center gap-2.5 cursor-pointer hover:bg-white/5 duration-200 py-1 rounded-xl";
  const { user, logout } = useAuth();
  const { isOpen, setIsOpen, ref } = useClickOutside();
  return (
    <header className="fixed top-0 left-0 w-full z-20 flex h-16 justify-center border-[#101115] border-b bg-[#141517] pt-2.5 pb-0.5">
      <div
        className={`flex h-full w-full max-w-310 items-center px-3 sm:px-4 ${isAuthenticated ? "justify-between gap-2" : "justify-center"}`}
      >
        <Link to="/" className="min-w-0 shrink rounded-xl px-1 sm:px-2.5">
          <h1 className="inline-block cursor-pointer pb-2 font-bold text-2xl text-donathell-main sm:text-3xl md:text-4xl">
            Donathell
          </h1>
        </Link>
        {isAuthenticated && (
          <div ref={ref} className="relative">
            <button
              className="flex max-w-[min(12rem,45vw)] cursor-pointer items-center justify-center rounded-xl px-2 font-semibold"
              onClick={() => setIsOpen(!isOpen)}
            >
              {user ? (
                <span className="truncate pb-1 text-base sm:text-xl">
                  {user.username}
                </span>
              ) : (
                <div className="w-26 h-6 bg-[#2b2c2e] rounded animate-pulse" />
              )}
              <ChevronDown
                size={24}
                className={`transition-transform duration-100 ${isOpen ? "rotate-180" : ""}`}
              />
            </button>
            <div
              className={`glass-dropdown absolute top-10 right-0 z-10 flex min-w-42 max-w-[calc(100vw-1.5rem)] flex-col gap-2 overflow-hidden rounded-xl p-1.5 md:right-auto md:left-1/2 md:-translate-x-1/2 ${isOpen ? "pointer-events-auto max-h-100 opacity-100" : "pointer-events-none max-h-0 opacity-0"} transition-all duration-150`}
            >
              <ul className="border-b border-[#2c2c2e] flex flex-col gap-1.5 pb-1.5">
                <Link
                  to={`/${user?.donationSlug}`}
                  className={className}
                  target="_blank"
                  rel="noreferrer"
                >
                  <PanelTop size={28} />
                  My page
                </Link>
                <li className={className}>
                  <Settings2 size={28} />
                  Settings
                </li>
              </ul>
              <button
                className={className}
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
              >
                <LogOut size={28} /> Log out
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

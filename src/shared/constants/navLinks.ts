import {
  HandCoins,
  LayoutDashboard,
} from "lucide-react";
import { type LucideIcon } from "lucide-react";

export interface NavLink {
  to: string;
  label: string;
  icon: LucideIcon;
}

export const NAV_LINKS_GENERAL: NavLink[] = [
  { to: "/donations", label: "Donations", icon: HandCoins },
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
];

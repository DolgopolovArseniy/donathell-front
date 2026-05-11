import {
  HandCoins,
  BanknoteArrowUp,
  MessageSquareDot,
  Goal,
} from "lucide-react";
import { type LucideIcon } from "lucide-react";

export interface NavLink {
  to: string;
  label: string;
  icon: LucideIcon;
}

export const NAV_LINKS_GENERAL: NavLink[] = [
  { to: "/donations", label: "Donations", icon: HandCoins },
  { to: "/payouts", label: "Payouts", icon: BanknoteArrowUp },
];

export const NAV_LINKS_WIDGETS: NavLink[] = [
  { to: "/notifications", label: "Notifications", icon: MessageSquareDot },
  { to: "/fundraising", label: "Fundraising", icon: Goal },
];

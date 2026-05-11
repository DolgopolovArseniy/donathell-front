import { Outlet } from "react-router";
import { useAuth } from "../../context/AuthContext";
import Header from "../common/Header";

export default function RootLayout() {
  const { isAuthenticated } = useAuth();
  return (
    <>
      <Header isAuthenticated={isAuthenticated} />
      <Outlet />
    </>
  );
}

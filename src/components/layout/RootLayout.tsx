import { Outlet, useNavigation } from "react-router";
import { useAuth } from "../../context/AuthContext";
import Header from "../common/Header";
import LoadingOverlay from "../common/LoadingOverlay";

export default function RootLayout() {
  const { isAuthenticated } = useAuth();
  const navigation = useNavigation();
  
  const isNavigating = navigation.state === "loading";

  return (
    <>
      <LoadingOverlay isVisible={isNavigating} />
      <Header isAuthenticated={isAuthenticated} />
      <Outlet />
    </>
  );
}

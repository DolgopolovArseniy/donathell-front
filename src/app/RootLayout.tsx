import { Outlet, useNavigation } from "react-router";
import { useAuth } from "../features/auth";
import Header from "../shared/components/Header";
import LoadingOverlay from "../shared/components/LoadingOverlay";

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

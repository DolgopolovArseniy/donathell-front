import { createBrowserRouter, redirect } from "react-router";
import RootLayout from "./components/layout/RootLayout";
import DonatePage from "./pages/DonatePage";
import LoginPage from "./pages/LoginPage";
import { getDashboardStats, getTransactions, getUserBySlug } from "./services/api";
import NotFound from "./components/common/NotFound";
import SignupPage from "./pages/SignupPage";
import DonationsPage from "./pages/DonationsPage";
import ProtectedRoute from "./components/common/ProtectedRoute";
import HomeLayout from "./components/layout/HomeLayout";
import DashboardPage from "./pages/DashboardPage";
import { isAxiosError } from "axios";

const handleLoaderError = (err: unknown) => {
  if (isAxiosError(err)) {
    if (err.response?.status === 404) return redirect("/404");
    if (err.response?.status === 401) return redirect("/login");
  }
  throw err;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
        loader: () => {
          const token = localStorage.getItem("token");
          if (token) return redirect("/");
        },
      },
      {
        path: "/signup",
        element: <SignupPage />,
      },
      {
        path: "/",
        element: (
          <ProtectedRoute>
            <HomeLayout />
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            loader: () => redirect("/donations"),
          },
          {
            path: "/donations",
            element: <DonationsPage />,
            loader: async () => {
              const token = localStorage.getItem("token");
              if (!token) return redirect("/login");

              try {
                const { transactions, total } = await getTransactions({
                  page: 1,
                });
                return { transactions, total };
              } catch (err) {
                return handleLoaderError(err);
              }
            },
          },
          {
            path: "/dashboard",
            element: <DashboardPage />,
            loader: async () => {
              try {
                const data = await getDashboardStats("7d");
                return data;
              } catch (err) {
                return handleLoaderError(err);
              }
            }
          },
        ],
      },
    ],
  },
  {
    path: "/:donationSlug",
    element: <DonatePage />,
    loader: async ({ params }) => {
      try {
        const user = await getUserBySlug(params.donationSlug!);
        return user;
      } catch (err) {
        if (isAxiosError(err) && err.response?.status === 404) {
          return redirect("/404");
        }
        throw err;
      }
    },
  },
  {
    path: "/404",
    element: <NotFound />,
  },
]);

export default router;

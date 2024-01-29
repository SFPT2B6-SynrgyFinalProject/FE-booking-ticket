import { RouterProvider, createBrowserRouter } from "react-router-dom";
import PrivateProvider from "./providers/PrivateProvider";
import PublicProvider from "./providers/PublicProvider";
import MyComponent from "./components/Doc";
import Dashboard from "./layouts/admin/dashboard";
import {
  Home,
  Register,
  Login,
  ForgetPassword,
  ResetPassword,
  EmailVerification,
  NotFound,
} from "./pages";

import {
  Flight,
  Promo,
  Order,
  Support,
  Notification,
  DownloadApp,
  Search,
  Profile,
  Data,
  Reset,
} from "./pages/buyers";

import {
  UsersList,
  RoutesList,
  AirLinesList,
  TransactionsList,
  PromosList,
  FlightSchedulesList,
  OrdersList,
  AirportsList,
} from "./pages/admin";

const router = createBrowserRouter([
  {
    element: <PrivateProvider />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/penerbangan",
        element: <Flight />,
      },
      {
        path: "/promo",
        element: <Promo />,
      },
      {
        path: "/pesanan",
        element: <Order />,
      },
      {
        path: "/notifikasi",
        element: <Notification />,
      },
      {
        path: "/bantuan",
        element: <Support />,
      },
      {
        path: "/unduh-app",
        element: <DownloadApp />,
      },
      {
        path: "/profile",
        element: <Profile />,
        children: [
          {
            path: "/profile",
            element: <Data />,
          },
          {
            path: "/profile/reset",
            element: <Reset />,
          },
        ],
      },
      {
        path: "/search",
        element: <Search />,
      },
      {
        path: "/admin",
        element: <Dashboard />,
      },
      {
        path: "/admin/pengguna",
        element: <UsersList />,
      },
      {
        path: "/admin/bandara",
        element: <AirportsList />,
      },
      {
        path: "/admin/rute",
        element: <RoutesList />,
      },
      {
        path: "/admin/maskapai",
        element: <AirLinesList />,
      },
      {
        path: "/admin/jadwal-penerbangan",
        element: <FlightSchedulesList />,
      },
      {
        path: "/admin/pemesanan",
        element: <OrdersList />,
      },
      {
        path: "/admin/promo",
        element: <PromosList />,
      },
      {
        path: "/admin/transaksi",
        element: <TransactionsList />,
      },
    ],
  },
  {
    element: <PublicProvider />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/components",
        element: <MyComponent />,
      },
      {
        path: "/forget-password",
        element: <ForgetPassword />,
      },
      {
        path: "/reset-password",
        element: <ResetPassword />,
      },
      {
        path: "/email-verification",
        element: <EmailVerification />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}

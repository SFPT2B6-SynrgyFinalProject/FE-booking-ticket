import { RouterProvider, createBrowserRouter } from "react-router-dom";
import PrivateProvider from "./providers/PrivateProvider";
import PublicProvider from "./providers/PublicProvider";
import MyComponent from "./components/Doc";
import Dashboard from "./layouts/admin/dashboard";
import {
  Register,
  Login,
  ForgetPassword,
  ResetPassword,
  EmailVerification,
  NotFound,
} from "./pages";

import { Home, Search } from "./pages/public";

import {
  // Flight,
  Promo,
  Support,
  DownloadApp,
  // refacor
  BuyerNotificationsList,
  BuyerProfileList,
  BuyerProfileData,
  BuyerProfileResetPassword,
  BuyerOrderList,
  BuyerOrderHistory,
  BuyerFlightOrder,
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
        element: <BuyerFlightOrder />,
      },
      {
        path: "/promo",
        element: <Promo />,
      },
      {
        path: "/pesanan",
        element: <BuyerOrderList />,
      },
      {
        path: "/pesanan/riwayat/:orderId",
        element: <BuyerOrderHistory />,
      },
      {
        path: "/notifikasi",
        element: <BuyerNotificationsList />,
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
        element: <BuyerProfileList />,
        children: [
          {
            path: "/profile",
            element: <BuyerProfileData />,
          },
          {
            path: "/profile/reset",
            element: <BuyerProfileResetPassword />,
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

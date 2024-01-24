import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateProvider from "./providers/PrivateProvider";
import PublicProvider from "./providers/PublicProvider";
import NotFound from "./pages/NotFound";
import MyComponent from "./components/Doc";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";
import EmailVerification from "./pages/EmailVerification";
import Notification from "./pages/buyers/Notification";
import Flight from "./pages/buyers/Flight";
import Promo from "./pages/buyers/Promo";
import Order from "./pages/buyers/Order";
import Support from "./pages/buyers/Support";
import DownloadApp from "./pages/buyers/DownloadApp";
import History from "./pages/buyers/History";
// import Pesanan from "./pages/history/Pesanan";
// import Riwayat from "./pages/history/Riwayat";
// import Detail from "./pages/history/Detail";

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
        path: "/history",
        element: <History />,
        // children: [
        //   {
        //     path: "/history",
        //     element: <Pesanan />,
        //   },
        //   {
        //     path: "/history/riwayat",
        //     element: <Riwayat />,
        //   },
        //   {
        //     path: "/profile/detail",
        //     element: <Detail />,
        //   },
        // ],
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

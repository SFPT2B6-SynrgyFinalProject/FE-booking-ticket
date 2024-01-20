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
import Notification from "./pages/Notification";
import Flight from "./pages/Flight";
import Promo from "./pages/Promo";
import Order from "./pages/Order";
import Support from "./pages/Support";
import DownloadApp from "./pages/DownloadApp";

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
        element: <Flight/>
      },
      {
        path: "/promo",
        element: <Promo/>
      },
      {
        path: "/pesanan",
        element: <Order/>
      },
      {
        path: "/notifikasi",
        element: <Notification/>
      },
      {
        path: "/bantuan",
        element: <Support/>
      },
      {
        path: "/unduh-app",
        element: <DownloadApp/>
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

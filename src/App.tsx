import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateProvider from "./providers/PrivateProvider";
import PublicProvider from "./providers/PublicProvider";
import NotFound from "./pages/NotFound";
import MyComponent from "./components/Doc";
import SendEmailForgotPassword from "./pages/sendEmailResetPassword";
import ResetPassword from "./pages/CreateNewPassword";
import RegisterEmailVerification from "./pages/RegisterEmailVerification";

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
        path: "/profile",
        element: <Profile />,
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

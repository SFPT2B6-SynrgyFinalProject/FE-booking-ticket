import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function PrivateProvider() {
  const userToken = localStorage.getItem("user_access_token") as string;
  if (!userToken || userToken === undefined) {
    return <Navigate to="/login"/>;
  }
  return (
    <>
      <div className="flex flex-col h-[100dvh]">
        <Navbar/>
          <main className="flex-grow">
            <Outlet/>
          </main>
        <Footer/>
      </div>
    </>
  )
}
import { Navigate, Outlet } from "react-router-dom";

export default function PublicProvider() {
  const userToken = localStorage.getItem("user_access_token") as string;
  if (userToken) {
    return <Navigate to="/"/>;
  }
  return (
    <>
      <Outlet/>
    </>
  )
}
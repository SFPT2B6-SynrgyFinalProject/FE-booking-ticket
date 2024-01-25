import { Navigate, Outlet } from "react-router-dom";
import { useUserToken } from "../lib/services/auth";

export default function PublicProvider() {
  const userToken = useUserToken();
  if (userToken) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <Outlet />
    </>
  );
}

import { Navigate, Outlet } from 'react-router-dom';

export default function PrivateProvider() {
  const userToken = localStorage.getItem("user_access_token") as string;
  if (!userToken || userToken === undefined) {
    return <Navigate to="/login"/>;
  }
  return (
    <>
      <Outlet/>
    </>
  )
}
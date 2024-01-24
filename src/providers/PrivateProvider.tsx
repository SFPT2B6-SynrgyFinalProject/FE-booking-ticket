import { Location, Navigate, Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../config/redux/store";
import { UserToken, userData } from "../lib/services/userLogin";
import { setUserData } from "../config/redux/action";
import { useUserToken } from "../lib/services/userToken";

export default function PrivateProvider() {
  const userToken = useUserToken();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const location: Location = useLocation();
  const publicPaths: string[] = ["/", "/search"];
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const payload: UserToken = {
          token: userToken,
        };
        const result = await userData(payload);
        dispatch(setUserData(result));
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (userToken) {
      fetchData();
    }
  }, [userToken, dispatch]);

  if (!userToken || userToken === undefined) {
    if (!publicPaths.includes(location.pathname)) {
      return <Navigate to="/login" />;
    }
  }

  if (userToken && isLoading) {
    return (
      <>
        <div className="h-screen flex items-center justify-center">
            <div role="status">
              <div className="animate-spin rounded-full w-10 h-10 bg-gradient-to-tr from-blue-600 to-blue-300">
                <div className="h-6 w-6 rounded-full bg-gray-100"></div>
              </div>
            </div>
        </div>
      </>
    )
  }

  return (
    <>
      <div className="flex flex-col h-full relative">
        <Navbar/>
          <main>
            <Outlet/>
          </main>
        <Footer/>
      </div>
    </>
  )
}
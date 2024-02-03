import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavigateFunction, useLocation, useNavigate } from "react-router";
import { RootState } from "../../../../config/redux/store";

export default function useList() {
  const location = useLocation();
  const [active, setActive] = useState<number>(1);
  const [logOut, setLogOut] = useState<boolean>(false);
  const [berhasilLogOut, setBerhasilLogOut] = useState<boolean>(false);
  const navigate: NavigateFunction = useNavigate();

  const profiles = useSelector((state: RootState) => state.userReducer);

  // Update active value based on the current route
  useEffect(() => {
    if (location.pathname === "/profile/reset") {
      setActive(2);
    } else {
      setActive(1);
    }
  }, [location.pathname]);
  const handleLogOut = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const { id } = event.currentTarget as HTMLAnchorElement; // Use currentTarget instead of target

    if (id === 'batal') {
      setLogOut(false);
    } else {
      setLogOut(true);
    }
  };
  
  const setPurge=():void=>{
      localStorage.clear();
      setBerhasilLogOut(true)
      setLogOut(false)
  }
  const handleRedirect=():void=>{
    navigate("/");
    window.location.reload();
  }
  return {
    active,
    profiles,
    berhasilLogOut,
    setPurge,
    handleLogOut,
    handleRedirect,
    logOut, 
    close
  };
}

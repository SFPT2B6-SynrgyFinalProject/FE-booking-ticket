import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavigateFunction, useLocation, useNavigate } from "react-router";
import { RootState } from "../../../../config/redux/store";

export default function useList() {
  const location = useLocation();
  const [active, setActive] = useState<number>(1);
  const [logOut, setLogOut] = useState<boolean>(false);
  const navigate: NavigateFunction = useNavigate();

  const profiles = useSelector((state: RootState) => state.userReducer);

  useEffect(() => {
    if (location.pathname === "/profile/reset") {
      setActive(2);
    } else {
      setActive(1);
    }
  }, [location.pathname]);
  const handleLogOut = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const { id } = event.currentTarget as HTMLAnchorElement; // Use currentTarget instead of target

    if (id === "batal") {
      setLogOut(false);
    } else {
      setLogOut(true);
    }
  };

  const setPurge = (): void => {
    localStorage.removeItem("user_access_token");
    localStorage.removeItem("user_role");
    navigate("/");
    window.location.reload();
    setLogOut(false);
  };

  return {
    active,
    profiles,
    setPurge,
    handleLogOut,
    logOut,
    close,
  };
}

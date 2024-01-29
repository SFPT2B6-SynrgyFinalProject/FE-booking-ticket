import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { RootState } from "../../../../config/redux/store";

export default function useList() {
  const location = useLocation();
  const [active, setActive] = useState<number>(1);
  const profiles = useSelector((state: RootState) => state.userReducer);

  // Update active value based on the current route
  useEffect(() => {
    if (location.pathname === "/profile/reset") {
      setActive(2);
    } else {
      setActive(1);
    }
  }, [location.pathname]);

  return {
    active,
    profiles,
  };
}

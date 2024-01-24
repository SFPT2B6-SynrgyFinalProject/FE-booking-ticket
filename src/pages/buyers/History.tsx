import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

function History() {
  const location = useLocation();
  const [active, setActive] = useState<number>(1);

  useEffect(() => {
    if (location.pathname === "/history/riwayat") {
      setActive(2);
    } else {
      setActive(1);
    }
  }, [location.pathname]);

  return (
    
}

export default History;

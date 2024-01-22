import { Link, type Location, useLocation, NavigateFunction, useNavigate } from "react-router-dom";
import Logo from "../assets/images/logo.png";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";
import { RootState } from "../config/redux/store";
import { useSelector } from "react-redux";

export default function Navbar() {
  const location: Location = useLocation();
  const [showUser, setShowUser] = useState<boolean>(false);
  const navigate: NavigateFunction = useNavigate();
  const userData = useSelector((state: RootState) => state.userReducer);
  const { fullName } = userData;
  const handleLogout = function () {
    const isLogout = confirm("Apakah anda yakin ingin logout?");
    if (isLogout) {
      localStorage.clear();
      navigate("/login");
    }
  };
  const handleActivePage = (path: string) => {
    switch (path) {
      case "/":
        return location.pathname === "/" ? "text-blue-600" : "";
      case "/penerbangan":
        return location.pathname === "/penerbangan" ? "text-blue-600" : "";
      case "/promo":
        return location.pathname === "/promo" ? "text-blue-600" : "";
      case "/pesanan":
        return location.pathname === "/pesanan" ? "text-blue-600" : "";
      case "/notifikasi":
        return location.pathname === "/notifikasi" ? "text-blue-600" : "";
      case "/bantuan":
        return location.pathname === "/bantuan" ? "text-blue-600" : "";
      case "/unduh-app":
        return location.pathname === "/unduh-app" ? "text-blue-600" : "";
      case "/profile":
        return location.pathname === "/profile" ? "text-blue-600" : "";
      default:
        return "";
    }
  };
  const handleShowUser = () => {
    setShowUser(() => !showUser);
  };
  return (
    <div className="w-full">
      <nav className="flex items-center justify-between px-20 py-5 shadow-lg shadow-gray-300/40">
        <img src={Logo} alt="logo-image" className="w-40" />
        <div className="flex text-sm font-medium gap-7">
          <Link to={"/"} className={handleActivePage("/")}>
            Beranda
          </Link>
          <Link to={"/penerbangan"} className={handleActivePage("/penerbangan")}>
            Penerbangan
          </Link>
          <Link to={"/promo"} className={handleActivePage("/promo")}>
            Promo
          </Link>
          <Link to={"/pesanan"} className={handleActivePage("/pesanan")}>
            Pesanan
          </Link>
          <Link
            to={"/notifikasi"}
            className={`flex items-center gap-2 ${handleActivePage("/notifikasi")}`}
          >
            <h6>Notifikasi</h6>
            <Icon icon="mdi:bell-outline" width={19}/></Link>
          <Link to={"/bantuan"} className={handleActivePage("/bantuan")}>Bantuan</Link>
          <Link to={"/unduh-app"} className={handleActivePage("/unduh-app")}>Unduh App</Link>
          <div onClick={handleShowUser} className={`flex items-center gap-2 cursor-pointer relative ${handleActivePage("/profile")}`}>
            <h6>User</h6>
            <Icon icon="tabler:user-circle" width={19}/>
            <div className={`absolute border rounded shadow top-7 right-0 bg-white w-36 ${showUser ? "" : "hidden"}`}>
              <menu className="text-center">
                <Link to={"/profile"}>
                  <li className="p-3 border-b hover:bg-[#F5F5F5]">
                    <h6>{fullName}</h6>
                  </li>
                </Link>
                <li className="p-3 text-black hover:bg-[#F5F5F5]" onClick={handleLogout}>
                  <h6>Logout</h6>
                </li>
              </menu>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

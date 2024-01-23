import {
  Link,
  type Location,
  useLocation,
  NavigateFunction,
  useNavigate,
} from "react-router-dom";
import Logo from "../assets/images/logo.png";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useState } from "react";
import { RootState } from "../config/redux/store";
import { useSelector } from "react-redux";
import { screenSize } from "../lib/services/screenSize";

export default function Navbar() {
  const location: Location = useLocation();
  const [showUser, setShowUser] = useState<boolean>(false);
  const navigate: NavigateFunction = useNavigate();
  const userData = useSelector((state: RootState) => state.userReducer);
  const [navigation, setNavigation] = useState<boolean>(false);
  const { fullName } = userData;
  const { width } = screenSize();

  useEffect(() => {
    if (width >= 1024) {
      setNavigation(false);
      setShowUser(false);
    }
  }, [width]);
  const handleLogout = function () {
    const isLogout = confirm("Apakah anda yakin ingin logout?");
    if (isLogout) {
      localStorage.clear();
      navigate("/login");
    }
  };
  const handleActivePage = (path: string) => {
    const isCurrentPath = location.pathname === path;
    switch (path) {
      case "/":
      case "/penerbangan":
      case "/promo":
      case "/pesanan":
      case "/notifikasi":
      case "/bantuan":
      case "/unduh-app":
        return isCurrentPath ? "text-blue-600" : "";
      case "/profile":
        return isCurrentPath ? "text-blue-600" : "";
      default:
        return "";
    }
  };

  const handleShowUser = () => {
    setShowUser(() => !showUser);
  };
  const handleNavigation = () => {
    setNavigation((prev) => !prev);
  };
  return (
    <div className="w-full">
      <div
        className={`${
          navigation
            ? "absolute bg-black opacity-50 lg:opacity-0 bottom-0 top-0 z-10 left-0 right-0"
            : ""
        }`}
      ></div>
      <nav
        className={`bg-white px-10 lg:px-20 py-5 flex shadow items-center justify-between`}
      >
        <img src={Logo} alt="logo-image" width={180} />
        {navigation ? (
          <>
            <Icon
              icon={"ph:x-bold"}
              width={30}
              className="flex lg:hidden cursor-pointer"
              onClick={handleNavigation}
            />
          </>
        ) : (
          <>
            <Icon
              icon={"fluent:navigation-16-filled"}
              width={30}
              className="flex lg:hidden cursor-pointer"
              onClick={handleNavigation}
            />
          </>
        )}
        {navigation ? (
          <>
            <div className="flex flex-col px-10 py-7 w-3/5 md:w-2/5 text-sm font-medium gap-7 absolute z-20 bg-white right-0 top-0 bottom-0">
              <Icon
                icon={"ph:x-bold"}
                width={30}
                className="flex cursor-pointer"
                onClick={handleNavigation}
              />
              <Link
                to={"/"}
                className={handleActivePage("/")}
                onClick={handleNavigation}
              >
                Beranda
              </Link>
              <Link
                to={"/penerbangan"}
                className={handleActivePage("/penerbangan")}
                onClick={handleNavigation}
              >
                Penerbangan
              </Link>
              <Link
                to={"/promo"}
                className={handleActivePage("/promo")}
                onClick={handleNavigation}
              >
                Promo
              </Link>
              <Link
                to={"/pesanan"}
                className={handleActivePage("/pesanan")}
                onClick={handleNavigation}
              >
                Pesanan
              </Link>
              <Link
                to={"/notifikasi"}
                className={`flex items-center gap-2 ${handleActivePage(
                  "/notifikasi"
                )}`}
                onClick={handleNavigation}
              >
                <h6>Notifikasi</h6>
                <Icon icon="mdi:bell-outline" width={19} />
              </Link>
              <Link
                to={"/bantuan"}
                className={handleActivePage("/bantuan")}
                onClick={handleNavigation}
              >
                Bantuan
              </Link>
              <Link
                to={"/unduh-app"}
                className={handleActivePage("/unduh-app")}
                onClick={handleNavigation}
              >
                Unduh App
              </Link>
              <div
                onClick={handleShowUser}
                className={`flex items-center gap-2 cursor-pointer relative ${handleActivePage(
                  "/profile"
                )}`}
              >
                <details className="w-full">
                  <summary className="flex flex-row gap-2 ">
                    <h6>User</h6>
                    <Icon icon="tabler:user-circle" width={19} />
                  </summary>
                  <div className="border mt-3 rounded">
                    <Link to={"/profile"} onClick={handleNavigation}>
                      <h6
                        className={`p-3 border-b hover:bg-[#F5F5F5] ${
                          location.pathname === "/profile" ? "bg-[#F5F5F5]" : ""
                        }`}
                      >
                        {fullName}
                      </h6>
                    </Link>
                    <h6
                      className="p-3 text-black hover:bg-[#F5F5F5]"
                      onClick={handleLogout}
                    >
                      Logout
                    </h6>
                  </div>
                </details>
              </div>
            </div>
          </>
        ) : (
          <div className="hidden flex-col text-sm font-medium gap-7 lg:flex-row lg:flex">
            <Link to={"/"} className={handleActivePage("/")}>
              Beranda
            </Link>
            <Link
              to={"/penerbangan"}
              className={handleActivePage("/penerbangan")}
            >
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
              className={`flex items-center gap-2 ${handleActivePage(
                "/notifikasi"
              )}`}
            >
              <h6>Notifikasi</h6>
              <Icon icon="mdi:bell-outline" width={19} />
            </Link>
            <Link to={"/bantuan"} className={handleActivePage("/bantuan")}>
              Bantuan
            </Link>
            <Link to={"/unduh-app"} className={handleActivePage("/unduh-app")}>
              Unduh App
            </Link>
            <div
              onClick={handleShowUser}
              className={`flex items-center gap-2 cursor-pointer relative ${handleActivePage(
                "/profile"
              )}`}
            >
              <h6>User</h6>
              <Icon icon="tabler:user-circle" width={19} />
              <div
                className={`absolute border rounded shadow top-7 right-0 bg-white w-36 ${
                  showUser ? "" : "hidden"
                }`}
              >
                <menu className="text-center">
                  <Link to={"/profile"}>
                    <li className="p-3 border-b hover:bg-[#F5F5F5]">
                      <h6>{fullName}</h6>
                    </li>
                  </Link>
                  <li
                    className="p-3 text-black hover:bg-[#F5F5F5]"
                    onClick={handleLogout}
                  >
                    <h6>Logout</h6>
                  </li>
                </menu>
              </div>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}

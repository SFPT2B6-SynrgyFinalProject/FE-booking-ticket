import {
  Link,
  type Location,
  useLocation,
  NavigateFunction,
  useNavigate,
} from "react-router-dom";
import Logo from "../assets/images/logo.png";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Fragment, useEffect, useState } from "react";
import { RootState } from "../config/redux/store";
import { useSelector } from "react-redux";
import { screenSize } from "../lib/services/screenSize";
import { Menu, Transition } from "@headlessui/react";
import { DropdownLink } from "./DropdownLink";
import { useUserRole } from "../lib/services/auth";
import OrderList from "./OrderList";

export default function Navbar() {
  const location: Location = useLocation();
  const navigate: NavigateFunction = useNavigate();
  const userData = useSelector((state: RootState) => state.userReducer);
  const [navigation, setNavigation] = useState<boolean>(false);
  const { fullName } = userData;
  const { width } = screenSize();
  const userRole = useUserRole();

  useEffect(() => {
    if (width >= 1024) {
      setNavigation(false);
    }
  }, [width]);

  const handleLogout = function () {
    const isLogout = confirm("Apakah anda yakin ingin logout?");
    if (isLogout) {
      localStorage.clear();
      navigate("/");
      window.location.reload();
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
      case "/profile":
      case "/profile/reset":
        return isCurrentPath ? "text-blue-700" : "hover:text-blue-700";
      default:
        return "";
    }
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
        className={`bg-white px-8 lg:px-12 py-5 flex shadow items-center justify-between`}
      >
        <img src={Logo} alt="logo-image" width={160} />
        {navigation ? (
          <>
            <Icon
              icon={"line-md:close"}
              width={30}
              className="flex lg:hidden cursor-pointer"
              onClick={handleNavigation}
            />
          </>
        ) : (
          <>
            <Icon
              icon={"heroicons-outline:menu-alt-3"}
              width={30}
              className="flex lg:hidden cursor-pointer"
              onClick={handleNavigation}
            />
          </>
        )}
        {userRole === "ROLE_ADMIN" ? (
          navigation ? (
            <>
              <div className="flex flex-col py-6 w-4/6 md:w-2/5 text-sm font-medium gap-7 absolute z-20 bg-white right-0 top-0 bottom-0">
                <div className="flex justify-end pr-8">
                  <Icon
                    icon={"line-md:close"}
                    width={30}
                    className="cursor-pointer"
                    onClick={handleNavigation}
                  />
                </div>
                <>
                  <Menu as={"div"} className="relative">
                    <Menu.Button
                      className={`${
                        handleActivePage("/profile") ||
                        handleActivePage("/profile/reset")
                      } flex items-center text-black hover:bg-transparent gap-x-2 pl-10 pr-8`}
                    >
                      Admin
                      <Icon icon="tabler:user-circle" width={19} />
                    </Menu.Button>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items
                        as={"div"}
                        className={
                          "absolute shadow-sm border border-gray-300 top-0 left-0 w-44 mt-8 py-1 overflow-hidden bg-white z-50 rounded-lg"
                        }
                      >
                        <DropdownLink
                          customStyle={handleActivePage("/profile")}
                          to="/profile"
                        >
                          Profile
                        </DropdownLink>

                        <DropdownLink
                          to="/profile/reset"
                          customStyle={handleActivePage("/profile/reset")}
                        >
                          Ubah Password
                        </DropdownLink>
                        <div className="w-full h-px my-1 bg-gray-200" />
                        <span
                          className="block px-4 py-2 text-black hover:text-blue-700 cursor-pointer"
                          onClick={handleLogout}
                        >
                          Logout
                        </span>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                  {location.pathname === "/admin" ? (
                    <>
                      <section className="rounded-tl-[3rem] bg-gray-100 pl-10 pr-8 pb-10">
                        <OrderList />
                      </section>
                    </>
                  ) : null}
                </>
              </div>
            </>
          ) : (
            <>
              <Menu as={"div"} className="relative hidden lg:block">
                <Menu.Button
                  className={`${
                    handleActivePage("/profile") ||
                    handleActivePage("/profile/reset")
                  } flex items-center text-black hover:bg-transparent gap-x-2`}
                >
                  Admin
                  <Icon icon="tabler:user-circle" width={19} />
                </Menu.Button>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items
                    as={"div"}
                    className={
                      "absolute shadow-sm border border-gray-300 top-0 right-0 w-44 mt-8 py-1 overflow-hidden bg-white z-50 rounded-lg"
                    }
                  >
                    <span
                      className="block px-4 py-2 text-black hover:text-blue-700 cursor-pointer"
                      onClick={handleLogout}
                    >
                      Logout
                    </span>
                  </Menu.Items>
                </Transition>
              </Menu>
            </>
          )
        ) : navigation ? (
          <>
            <div className="flex flex-col pl-10 pr-8 py-6 w-4/6 md:w-2/5 text-sm font-medium gap-7 absolute z-20 bg-white right-0 top-0 bottom-0">
              <div className="flex justify-end">
                <Icon
                  icon={"line-md:close"}
                  width={30}
                  className="cursor-pointer"
                  onClick={handleNavigation}
                />
              </div>

              {fullName ? (
                <>
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

                  <Menu as={"div"} className="relative">
                    <Menu.Button
                      className={`${
                        handleActivePage("/profile") ||
                        handleActivePage("/profile/reset")
                      } flex items-center text-black hover:bg-transparent gap-x-2`}
                    >
                      {fullName}
                      <Icon icon="tabler:user-circle" width={19} />
                    </Menu.Button>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items
                        as={"div"}
                        className={
                          "absolute shadow-sm border border-gray-300 top-0 left-0 w-44 mt-8 py-1 overflow-hidden bg-white z-50 rounded-lg"
                        }
                      >
                        <DropdownLink
                          customStyle={handleActivePage("/profile")}
                          to="/profile"
                        >
                          Profile
                        </DropdownLink>

                        <DropdownLink
                          to="/profile/reset"
                          customStyle={handleActivePage("/profile/reset")}
                        >
                          Ubah Password
                        </DropdownLink>
                        <div className="w-full h-px my-1 bg-gray-200" />
                        <span
                          className="block px-4 py-2 text-black hover:text-blue-700 cursor-pointer"
                          onClick={handleLogout}
                        >
                          Logout
                        </span>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </>
              ) : (
                <>
                  <Link
                    to={"/"}
                    className={handleActivePage("/")}
                    onClick={handleNavigation}
                  >
                    Beranda
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

                  <Link to={"/login"} className="font-semibold flex">
                    Log In
                    <Icon
                      icon="tabler:user-circle"
                      width={19}
                      className="ml-2"
                    />
                  </Link>

                  <Link to={"/register"} className="font-semibold">
                    Register
                  </Link>
                </>
              )}
            </div>
          </>
        ) : (
          <div className="hidden flex-col items-center text-sm font-medium gap-7 lg:flex-row lg:flex">
            {fullName ? (
              <>
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

                <Link
                  to={"/unduh-app"}
                  className={handleActivePage("/unduh-app")}
                >
                  Unduh App
                </Link>

                <Menu as={"div"} className="relative">
                  <Menu.Button
                    className={`${
                      handleActivePage("/profile") ||
                      handleActivePage("/profile/reset")
                    } flex items-center text-black hover:bg-transparent gap-x-2`}
                  >
                    {fullName}
                    <Icon icon="tabler:user-circle" width={19} />
                  </Menu.Button>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items
                      as={"div"}
                      className={
                        "absolute shadow-sm border border-gray-300 top-0 right-0 w-56 mt-8 py-1 overflow-hidden bg-white z-50 rounded-lg"
                      }
                    >
                      <DropdownLink
                        customStyle={handleActivePage("/profile")}
                        to="/profile"
                      >
                        Profile
                      </DropdownLink>

                      <DropdownLink
                        to="/profile/reset"
                        customStyle={handleActivePage("/profile/reset")}
                      >
                        Ubah Password
                      </DropdownLink>
                      <div className="w-full h-px my-1 bg-gray-200" />
                      <span
                        className="block px-4 py-2 text-black hover:text-blue-700 cursor-pointer"
                        onClick={handleLogout}
                      >
                        Logout
                      </span>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </>
            ) : (
              <>
                <Link to={"/"} className={handleActivePage("/")}>
                  Beranda
                </Link>

                <Link to={"/bantuan"} className={handleActivePage("/bantuan")}>
                  Bantuan
                </Link>

                <Link
                  to={"/unduh-app"}
                  className={handleActivePage("/unduh-app")}
                >
                  Unduh App
                </Link>

                <Link to={"/login"} className="pl-4 font-semibold -mr-2 flex">
                  Log In
                  <Icon icon="tabler:user-circle" width={19} className="ml-2" />
                </Link>

                <Link
                  to={"/register"}
                  className="bg-blue-700 text-white px-2 py-[1px] rounded"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        )}
      </nav>
    </div>
  );
}

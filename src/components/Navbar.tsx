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
import { useDispatch, useSelector } from "react-redux";
import { screenSize } from "../lib/services/screenSize";
import { Menu, Transition } from "@headlessui/react";
import { DropdownLink } from "./DropdownLink";
import { useUserRole } from "../lib/services/auth";
import OrderList from "../containers/admin/dashboard/list/OrderList";
import { removeNotificationOrderIds } from "../config/redux/action/notificationAction";
import { FormModal } from "./FormModal";
import Button from "./Button";
import { useTransaction } from "../containers/admin/dashboard/list/dashboard.hooks";

export default function Navbar() {
  const location: Location = useLocation();
  const navigate: NavigateFunction = useNavigate();
  const userData = useSelector((state: RootState) => state.userReducer);
  const [navigation, setNavigation] = useState<boolean>(false);
  const { fullName } = userData;
  const { width } = screenSize();
  const userRole = useUserRole();
  const [logOut, setLogOut] = useState<boolean>(false);
  const {
    detailTransactionToday,
    detailTransactionYesterday,
    isLoadingDetailTransaction,
  } = useTransaction();

  // notifications bells-icon handling
  const [unseenNotificationsCount, setUnseenNotificationsCount] =
    useState<number>(0);
  const notifications = useSelector(
    (state: RootState) => state.notificationReducer
  );
  const dispatch = useDispatch();

  useEffect(() => {
    setUnseenNotificationsCount(Number(notifications.orderCount));
  }, [notifications.orderCount]);

  useEffect(() => {
    if (location.pathname === "/notifikasi") {
      dispatch(removeNotificationOrderIds());
      localStorage.removeItem("orderCount");
    }
  }, [location, dispatch]);

  useEffect(() => {
    if (width >= 1024) {
      setNavigation(false);
    }
  }, [width]);

  const handleLogOut = (event: React.MouseEvent<HTMLAnchorElement>) => {
    setNavigation(false)
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

  const handleActivePage = (path: string) => {
    const isCurrentPath = location.pathname === path;
    switch (path) {
      // case "/penerbangan":
      case "/":
      case "/pesanan":
      case "/notifikasi":
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

  const linkDownloadApp =
    "https://drive.google.com/file/d/1lByfFYjNqJ8hmsEflLzRrJNkZhRQWEeW/view?usp=drive_link";

  return (
    <div className="w-full hide-on-print">
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
              className="flex cursor-pointer lg:hidden"
              onClick={handleNavigation}
            />
          </>
        ) : (
          <>
            <Icon
              icon={"heroicons-outline:menu-alt-3"}
              width={30}
              className="flex cursor-pointer lg:hidden"
              onClick={handleNavigation}
            />
          </>
        )}
        {userRole === "ROLE_ADMIN" ? (
          navigation ? (
            <>
              <div className="absolute top-0 bottom-0 right-0 z-20 flex flex-col w-4/6 py-6 text-sm font-medium bg-white sm:pl-10 md:pl-0 md:w-2/5 gap-7">
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
                          "absolute shadow-sm border border-gray-300 top-0 left-0 w-44 mt-8 py-1 overflow-hidden bg-white z-50 rounded-lg ml-9"
                        }
                      >
                        <span
                          className="block px-4 py-2 text-black cursor-pointer hover:text-blue-700"
                          onClick={handleLogOut}
                        >
                          Logout
                        </span>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                  {location.pathname === "/admin" ? (
                    <>
                      <section className="rounded-tl-[3rem] pl-10 pr-8 pb-10">
                        <OrderList
                          detailTransaction={detailTransactionToday}
                          day="Hari ini"
                          isLoading={isLoadingDetailTransaction}
                        />
                        <OrderList
                          detailTransaction={detailTransactionYesterday}
                          day="Kemarin"
                          isLoading={isLoadingDetailTransaction}
                        />
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
                  <Icon icon="tabler:user-circle" width={23} />
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
                      className="block px-4 py-2 text-black cursor-pointer hover:text-blue-700"
                      onClick={handleLogOut}
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
            <div className="absolute top-0 bottom-0 right-0 z-20 flex flex-col w-4/6 py-6 pl-10 pr-8 text-sm font-medium bg-white md:w-2/5 gap-7">
              <div className={`flex ${fullName ? "justify-between items-center" : "justify-end"}`}>
                {fullName ? (
                  <Link
                    id="notifikasi"
                    to={"/notifikasi"}
                    className={`flex items-center ml-1 ${handleActivePage(
                      "/notifikasi"
                    )}`}
                    onClick={handleNavigation}
                  >
                    <Icon icon="mdi:bell-outline" width={22} />
                    <span className="relative">
                      {unseenNotificationsCount > 0 ? (
                        <span className="absolute w-[18px] font-semibold text-center -top-4 -right-[13px] bg-red-500 text-xs text-white px-1 py-0.5 rounded-full">
                          {unseenNotificationsCount}
                        </span>
                      ) : (
                        <span></span>
                      )}
                    </span>
                  </Link>
                ) : (
                  ""
                )}

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

                  {/* <Link
                    to={"/penerbangan"}
                    className={handleActivePage("/penerbangan")}
                    onClick={handleNavigation}
                  >
                    Penerbangan
                  </Link> */}

                  <Link
                    id="pesanan"
                    to={"/pesanan"}
                    className={handleActivePage("/pesanan")}
                    onClick={handleNavigation}
                  >
                    Pesanan
                  </Link>

                  <a
                    href={linkDownloadApp}
                    target="_blank"
                    className="hover:text-blue-700"
                    download
                  >
                    Unduh App
                  </a>

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
                          to="/profile"
                          customStyle={handleActivePage("/profile")}
                          onClick={handleNavigation}
                        >
                          Profiles
                        </DropdownLink>

                        <DropdownLink
                          to="/profile/reset"
                          customStyle={handleActivePage("/profile/reset")}
                          onClick={handleNavigation}
                        >
                          Ubah Password
                        </DropdownLink>
                        <div className="w-full h-px my-1 bg-gray-200" />
                        <span
                          className="block px-4 py-2 text-black cursor-pointer hover:text-blue-700"
                          onClick={handleLogOut}
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

                  <a
                    href={linkDownloadApp}
                    target="_blank"
                    className="hover:text-blue-700"
                    download
                  >
                    Unduh App
                  </a>

                  <Link to={"/login"} className="flex font-semibold hover:text-blue-700">
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
          <div className="flex-col items-center hidden text-sm font-medium gap-7 lg:flex-row lg:flex">
            {fullName ? (
              <>
                <Link to={"/"} className={handleActivePage("/")}>
                  Beranda
                </Link>

                {/* <Link to={"/penerbangan"} className={handleActivePage("/penerbangan")}>
                  Penerbangan
                </Link> */}

                <Link id="pesanan" to={"/pesanan"} className={handleActivePage("/pesanan")}>
                  Pesanan
                </Link>

                <a
                  href={linkDownloadApp}
                  target="_blank"
                  className="hover:text-blue-700"
                  download
                >
                  Unduh App
                </a>

                <Link
                  id="notifikasi"
                  to={"/notifikasi"}
                  className={`flex items-center ml-1 ${handleActivePage(
                    "/notifikasi"
                  )}`}
                >
                  <Icon icon="mdi:bell-outline" width={22} />
                  <span className="relative">
                    {unseenNotificationsCount > 0 ? (
                      <span className="absolute w-[18px] font-semibold text-center -top-4 -right-[13px] bg-red-500 text-xs text-white px-1 py-0.5 rounded-full">
                        {unseenNotificationsCount}
                      </span>
                    ) : (
                      <span></span>
                    )}
                  </span>
                </Link>

                <Menu as={"div"} className="relative">
                  <Menu.Button
                    className={`${
                      handleActivePage("/profile") ||
                      handleActivePage("/profile/reset")
                    } flex items-center text-black hover:bg-transparent gap-x-2`}
                  >
                    <Icon icon="tabler:user-circle" width={23} />
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
                        className="block px-4 py-2 text-black cursor-pointer hover:text-blue-700"
                        onClick={handleLogOut}
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

                <a
                  href={linkDownloadApp}
                  target="_blank"
                  className="hover:text-blue-700"
                  download
                >
                  Unduh App
                </a>

                <Link to={"/login"} className="flex pl-4 -mr-2 font-semibold hover:text-blue-700">
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

      <>
        {logOut ? (
          <FormModal title="" isOpen={true}>
            <div className="flex flex-col items-center justify-center h-full text-center">
              <h3 className="mt-3 mb-6 text-lg font-semibold sm:text-xl">
                Apakah Anda yakin ingin logout?
              </h3>

              <div className="flex gap-4">
                <>
                  <a href="#" id="batal" onClick={handleLogOut}>
                    <Button
                      type="primary-dark"
                      color="primary-dark"
                      className="!px-10"
                    >
                      Tidak
                    </Button>
                  </a>
                  <Button
                    type="danger"
                    color="danger"
                    className="mr-3 bg-rose-600 hover:bg-rose-700"
                    onClick={setPurge}
                  >
                    Ya
                  </Button>
                </>
              </div>
            </div>
          </FormModal>
        ) : null}
      </>
    </div>
  );
}

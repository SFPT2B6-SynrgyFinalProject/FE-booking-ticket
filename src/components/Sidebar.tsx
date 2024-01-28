import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const menu = [
    { name: "Dashboard", icon: <Icon icon="lucide:home" width={22} /> },
    { name: "Pengguna", icon: <Icon icon="heroicons:user-group" width={22} /> },
    { name: "Bandara", icon: <Icon icon="fe:building" width={22} /> },
    { name: "Rute", icon: <Icon icon="gis:route" width={22} /> },
    { name: "Maskapai", icon: <Icon icon="ion:airplane-outline" width={22} /> },
    { name: "Jadwal Penerbangan", icon: <Icon icon="quill:list" width={22} /> },
    { name: "Pemesanan", icon: <Icon icon="ph:archive" width={22} /> },
    { name: "Transaksi", icon: <Icon icon="la:money-check" width={22} /> },
    { name: "Promo", icon: <Icon icon="iconamoon:discount" width={22} /> },
  ];
  const handleActivePage = (path: string) => {
    return location.pathname === path ? "text-blue-700" : "hover:text-blue-700";
  };
  return (
    <>
      <div className="lg:w-72 h-auto border-r border-gray-200 px-4 lg:px-12 space-y-14 pb-10 lg:pb-48">
        <div className="flex flex-col items-end lg:items-start">
          <h3 className="mb-4 font-semibold text-blue-700 mt-5">Menu</h3>
          <ul className="space-y-7">
            {menu.map((val, index) => {
              const pathName = val.name.toLowerCase().replace(/\s+/g, "-");
              return (
                <Link
                  to={`/${val.name.toLowerCase() === "dashboard" ? "admin" : `admin/${pathName}`}`}
                  key={index}
                  className={`flex flex-row items-center  ${handleActivePage(
                    `/${val.name.toLowerCase() === `dashboard` ? `admin` : `admin/${pathName}`}`
                  )}`}
                >
                  <div className="mr-4">{val.icon}</div>
                  <div className="hidden lg:block">{val.name}</div>
                </Link>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}

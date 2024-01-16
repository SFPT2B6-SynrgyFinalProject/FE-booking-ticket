// import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import { useSearchParams } from "react-router-dom";

export default function RegisterEmailVerification() {
  const [searchParams] = useSearchParams("");
  const status = searchParams.get("status");

  type IconResult = {
    icon: string;
    width: number;
    height: number;
    widthSm: number;
    heightSm: number;
    color: string;
  };

  const renderIcons = (status: string | null): IconResult => {
    switch (status) {
      case "success":
        return {
          icon: "akar-icons:check",
          width: 110,
          height: 110,
          widthSm: 80,
          heightSm: 80,
          color: "#22c55e",
        };

      case "fail":
        return {
          icon: "akar-icons:cross",
          width: 90,
          height: 90,
          widthSm: 70,
          heightSm: 70,
          color: "#f43f5e",
        };

      default:
        return {
          icon: "akar-icons:check",
          width: 110,
          height: 110,
          widthSm: 80,
          heightSm: 80,
          color: "#22c55e",
        };
    }
  };

  const message = (status: string | null) => {
    switch (status) {
      case "success":
        return "Selamat verifikasi alamat email Anda berhasil";

      case "fail":
        return "Verifikasi alamat email Anda gagal, link expired";

      default:
        return "Selamat verifikasi alamat email Anda berhasil";
    }
  };

  console.log(renderIcons(status));

  return (
    <div className="flex justify-center items-center h-screen bg-blue-300">
      <div className="flex flex-col justify-center items-center bg-white rounded-lg p-7 pt-3 lg:p-10 lg:pt-5 lg:w-5/12">
        <div>
          <div className="lg:block hidden mb-5">
            <Icon
              icon={renderIcons(status).icon}
              width={renderIcons(status).width}
              height={renderIcons(status).height}
              color={renderIcons(status).color}
            />
          </div>
          <div className="sm:block lg:hidden mb-5">
            <Icon
              icon={renderIcons(status).icon}
              width={renderIcons(status).widthSm}
              height={renderIcons(status).heightSm}
              color={renderIcons(status).color}
            />
          </div>
        </div>

        <h3 className="text-md text-center lg:text-xl mb-1">
          {message(status)}
        </h3>
        <p className={`text-sm text-center lg:text-base mb-5`}>
          Terima kasih telah mendaftar pada Wings on!
        </p>

        <div className={status !== "success" ? "hidden" : ""}>
          <Link to="/">
            <Button
              type="primary-dark"
              color="primary-dark"
              className="mt-5 font-semibold"
            >
              Login
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

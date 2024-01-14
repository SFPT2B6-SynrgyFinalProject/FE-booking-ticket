import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import InputComponent from "../components/Input";
import Logo from "./../assets/images/logo.png";
import Airplane from "./../assets/images/airplane-and-packages-1.png";
import { Icon } from "@iconify/react/dist/iconify.js";
// import InputComponent from "../components/Input";
export default function SendEmailForgotPassword() {
  const [email, setEmail] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    switch (name) {
      case "email":
        setEmail(value);
        break;
    }
  };
  return (
    <div className="flex justify-center items-center lg:h-screen lg:bg-blue-300">
      <div className="flex justify-center items-center bg-white rounded-lg p-10 lg:w-9/12 relative">
        <div className="w-full lg:w-1/2 lg:block hidden">
          <div className="w-full h-full">
            <img
              src={Airplane}
              alt="bg-login"
              className="object-cover rounded-2xl shadow-xl"
              style={{
                backgroundColor: "#F3F4F6",
                height: "500px",
                margin: "30px",
              }}
            />
          </div>
        </div>
        <div className="w-full lg:w-1/2">
          <div className="mt-10 md:pt-0 px-8 md:px-16 lg:px-2">
            <div className="flex flex-col items-center mb-3">
              <img src={Logo} alt="logo" className="object-cover w-50" />
              <div className="flex items-center mt-5">
                <Link to="/">
                  <Icon
                    icon="ic:outline-keyboard-arrow-left"
                    width={30}
                    height={30}
                    color="#1C1C1E"
                  />
                </Link>{" "}
                &nbsp;&nbsp;{" "}
                <h1 className="font-bold text-xl">Lupa Kata Sandi</h1>
                
              </div>
                <p className="mt-5 text-sm text-center">Lupa Password? Jangan Khawatir! masukan email anda dibawah dan kami akan mengirmkan link untuk memperbarui kata sandi</p>
            </div>
            <form
              
              className="mt-10 md:pt-0 md:px-0 lg:px-12"
            >
              <>
                <div className="flex flex-col mb-7">
                  <InputComponent
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    placeholder="Email Address"
                  />
                </div>
                <div className="flex flex-col mb-5">
                </div>
                

                <Button
                  type="primary-dark"
                  width="full"
                  color="primary-dark"
                  className={`mt-5`}
                  disabled={!email}
                >
                  Send Reset Link
                </Button>
              </>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

import { InlineIcon } from "@iconify/react/dist/iconify.js";
import Logo from "../assets/images/logo.png";

export default function Footer() {
  return (
    <footer className="bg-[#B1C5FF] shadow">
      <div className="w-full mx-auto p-6 text-center  max-w-screen-xl">
        <div className="mt-10">
          <h1 className="block font-outfit lg:text-3xl text-xl font-medium leading-11 text-white xl:text-center sm:text-center">
            Let's Work Together
          </h1>
        </div>
        <div className="mt-10 flex justify-center">
          <img src={Logo} alt="logo-image" width={230} />
        </div>
        <div className="mt-12 mb-6 grid md:grid-cols-1 lg:grid-cols-4 gap-3 text-white">
          <div className="text-l ">
            {" "}
            <a href="#">&copy; Copyright 2024</a>
          </div>
          <div className="text-l ">
            {" "}
            <a href="#">Privacy Policies</a>
          </div>
          <div className="text-l ">
            <a href="#">Connect With Us With Social Media</a>
          </div>
          <div className="max-w-[calc(2/3*100vw)] mx-auto grid grid-cols-3 gap-4 items-center text-l">
            <div>
              <a href="http://www.instagram.com">
                {" "}
                <div className="bg-white p-1 rounded">
                  <InlineIcon icon="mdi:instagram" color="black" />
                </div>
              </a>
            </div>
            <div>
              <a href="http://www.twitter.com">
                {" "}
                <div className="bg-white p-1 rounded">
                  <InlineIcon icon="mdi:twitter" color="black" />
                </div>
              </a>
            </div>
            <div>
              <a href="http://www.facebook.com">
                <div className="bg-white p-1 rounded">
                  <InlineIcon icon="mdi:facebook" color="black" />
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

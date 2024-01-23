import React, { useContext, ChangeEvent } from "react";
import { StepperContext } from "../context/StepperContext";
import InputComponent from "../Input";
import { Card } from "../Card";
// import Button from "../Button";

interface BookingProps {}

export const Booking: React.FC<BookingProps> = () => {
  const { orderData, setOrderData } = useContext(StepperContext);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setOrderData({ ...orderData, [name]: value });
  };

  return (
    <>
      <Card title="Detail Pemesan" customStyle="md:pt-10">
        <div className="grid grid-cols-1 gap-x-0 lg:grid-cols-2 lg:gap-x-20">
          <div className="flex flex-col mb-7">
            <InputComponent
              type="text"
              id="name"
              name="name"
              customStyle={`py-[16px] pl-[20px] pr-[20px]`}
              onChange={handleChange}
              value={orderData["name"] || ""}
              placeholder="Nama Lengkap"
            />
          </div>

          <div className="flex items-center mb-7">
            <div className="flex items-center mr-3 sm:mr-10">
              <input type="radio" name="call" id="tuan" className="w-5 h-5" />
              <label htmlFor="tuan" className="ml-2 sm:ml-3 sm:text-lg text-gray-800 select-none">
                Tuan
              </label>
            </div>

            <div className="flex items-center mr-3 sm:mr-10">
              <input type="radio" name="call" id="nyonya" className="w-5 h-5" />
              <label htmlFor="nyonya" className="ml-2 sm:ml-3 sm:text-lg text-gray-800 select-none">
                Nyonya
              </label>
            </div>

            <div className="flex items-center">
              <input type="radio" name="call" id="nona" className="w-5 h-5" />
              <label htmlFor="nona" className="ml-2 sm:ml-3 sm:text-lg text-gray-800 select-none">
                Nona
              </label>
            </div>
          </div>

          <div className="flex flex-col mb-7">
            <InputComponent
              type="text"
              id="phone"
              name="phone"
              customStyle={`py-[16px] pl-[20px] pr-[20px]`}
              onChange={handleChange}
              value={orderData["phone"] || ""}
              placeholder="Nomor Telepon"
            />
          </div>

          <div className="flex flex-col mb-7">
            <InputComponent
              type="email"
              id="email"
              name="email"
              customStyle={`py-[16px] pl-[20px] pr-[20px]`}
              onChange={handleChange}
              value={orderData["email"] || ""}
              placeholder="Alamat E-mail"
            />
          </div>
        </div>
      </Card>

      <Card title="Detail Penumpang" customStyle="mt-14 md:pt-10">
        <h1 className="mt-4 mb-6 text-xl font-semibold text-black">Penumpang 1 (Dewasa)</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-20">
          <div className="flex flex-col mb-7">
            <InputComponent
              type="text"
              id="name"
              name="name"
              customStyle={`py-[16px] pl-[20px] pr-[20px]`}
              onChange={handleChange}
              value={orderData["name"] || ""}
              placeholder="Nama Lengkap"
            />
            <span className="mt-3 ml-1 text-sm text-gray-500">
              Isi sesuai KTP/Paspor/SIM (tanpa tanda baca dan gelar)
            </span>
          </div>

          <div className="flex flex-col items-start lg:items-center justify-start mb-7">
            <label className="relative inline-flex items-center cursor-pointer me-5">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-blue-700" />
              <span className="ml-3 text-sm text-gray-800">Sama dengan pemesan</span>
            </label>
          </div>

          <div className="flex items-center mb-7 md:pl-1">
            <div className="flex items-center mr-3 sm:mr-10">
              <input type="radio" name="call2" id="tuan2" className="w-5 h-5" />
              <label htmlFor="tuan2" className="ml-2 sm:ml-3 sm:text-lg text-gray-800 select-none">
                Tuan
              </label>
            </div>

            <div className="flex items-center mr-3 sm:mr-10">
              <input type="radio" name="call2" id="nyonya2" className="w-5 h-5" />
              <label htmlFor="nyonya2" className="ml-2 sm:ml-3 sm:text-lg text-gray-800 select-none">
                Nyonya
              </label>
            </div>

            <div className="flex items-center">
              <input type="radio" name="call2" id="nona2" className="w-5 h-5" />
              <label htmlFor="nona2" className="ml-2 sm:ml-3 sm:text-lg text-gray-800 select-none">
                Nona
              </label>
            </div>
          </div>
        </div>
      </Card>

      {/* <div className="flex w-2/6 mx-auto mt-20">
        <Button
          type="primary-dark"
          width="full"
          color="primary-dark"
        >
          Lanjutkan
        </Button>
      </div> */}
    </>
  );
};

import React, { useContext, ChangeEvent } from "react";
import { StepperContext } from "../context/StepperContext";
import InputComponent from "../Input";

interface PaymentProps {}

export const Payment: React.FC<PaymentProps> = () => {
  const { userData, setUserData } = useContext(StepperContext);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  return (
    <>
      <div className="bg-white shadow-xl lg:py-12 shadow-gray-300/70 rounded-3xl md:pt-0 md:px-0 lg:px-16">
        <h1 className="mb-8 text-2xl font-semibold text-black">Metode Pembayaran</h1>

        <div className="grid grid-cols-2 gap-x-40">
          <div>
            <div className="flex items-center mb-7">
              <div className="flex items-center mr-10">
                <input type="radio" name="payment" id="creditCard" className="w-5 h-5" />
                <label htmlFor="creditCard" className="ml-3 text-lg text-gray-800 select-none">
                  Kartu Kredit
                </label>
              </div>

              <div className="flex items-center mr-10">
                <input type="radio" name="payment" id="debit" className="w-5 h-5" />
                <label htmlFor="debit" className="ml-3 text-lg text-gray-800 select-none">
                  Debit
                </label>
              </div>
            </div>
            <div className="flex flex-col mb-7">
              <InputComponent
                type="text"
                id="noCreditCard"
                name="noCreditCard"
                customStyle={`py-[16px] pl-[20px] pr-[20px]`}
                onChange={handleChange}
                value={userData["noCreditCard"] || ""}
                placeholder="Nomor Kartu Kredit"
              />
            </div>

            <div className="flex flex-col mb-7">
              <InputComponent
                type="text"
                id="nameCreditCard"
                name="nameCreditCard"
                customStyle={`py-[16px] pl-[20px] pr-[20px]`}
                onChange={handleChange}
                value={userData["nameCreditCard"] || ""}
                placeholder="Nama yang Tertera di Kartu Kredit"
              />
            </div>

            <div className="grid grid-cols-2 gap-x-10">
              <div className="flex flex-col mb-7">
                <InputComponent
                  type="text"
                  id="validityPeriod"
                  name="validityPeriod"
                  customStyle={`py-[16px] pl-[20px] pr-[20px]`}
                  onChange={handleChange}
                  value={userData["validityPeriod"] || ""}
                  placeholder="Masa Berlaku: MM/YY"
                />
              </div>
              <div className="flex flex-col mb-7">
                <InputComponent
                  type="number"
                  id="cvv"
                  name="cvv"
                  customStyle={`py-[16px] pl-[20px] pr-[20px]`}
                  onChange={handleChange}
                  value={userData["cvv"] || ""}
                  placeholder="Cvv: 3-4 digit kode"
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-8 text-xl font-semibold text-black">Rincian Harga</h3>
            <div className="grid grid-cols-2 gap-x-20">
              <div className="grid grid-flow-row gap-y-8">
                <span className="font-medium">Harga Dewasa (x1)</span>
                <span className="font-medium">Diskon</span>
                <span className="font-medium">Pajak</span>
                <span className="font-medium">Total</span>
              </div>

              <div className="flex flex-col items-end justify-between">
                <span className="font-medium">Rp. 720.346 </span>
                <span className="font-medium">-Rp. 20.000 </span>
                <span className="font-medium">Termasuk</span>
                <span className="font-semibold text-green-500">Rp. 700.346 </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

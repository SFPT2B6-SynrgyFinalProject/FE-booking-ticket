import React, { ChangeEvent } from "react";
import InputComponent from "../../../../../components/Input";
import { Card } from "../../../../../components/Card";
import { IPaymentData } from "./../../flights.types";

interface PaymentProps {
  formPaymentData: IPaymentData;
  setFormPaymentData: React.Dispatch<React.SetStateAction<IPaymentData>>;
}

export const Payment: React.FC<PaymentProps> = ({ formPaymentData, setFormPaymentData }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormPaymentData({ ...formPaymentData, [name]: value });
  };

  console.log(formPaymentData);

  return (
    <>
      <form>
        <Card title="Metode Pembayaran" customStyle="lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-40">
            <div className="mb-5 lg:mb-0">
              <div className="flex items-center mb-7">
                <div className="flex items-center mr-10">
                  <input type="radio" name="payment" id="creditCard" className="w-5 h-5" />
                  <label htmlFor="creditCard" className="ml-3 text-lg text-gray-800 select-none">
                    Kartu Kreditssssssss
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
                  id="cardNumber"
                  name="cardNumber"
                  customStyle={`py-[16px] pl-[20px] pr-[20px]`}
                  onChange={handleChange}
                  value={formPaymentData["cardNumber"] || ""}
                  placeholder="Nomor Kartu Kredit"
                />
              </div>

              <div className="flex flex-col mb-7">
                <InputComponent
                  type="text"
                  id="cardName"
                  name="cardName"
                  customStyle={`py-[16px] pl-[20px] pr-[20px]`}
                  onChange={handleChange}
                  value={formPaymentData["cardName"] || ""}
                  placeholder="Nama yang Tertera di Kartu Kredit"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-x-10">
                <div className="flex flex-col mb-7">
                  <InputComponent
                    type="text"
                    id="expiredDate"
                    name="expiredDate"
                    customStyle={`py-[16px] pl-[20px] pr-[20px]`}
                    onChange={handleChange}
                    value={formPaymentData["expiredDate"] || ""}
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
                    value={formPaymentData["cvv"] || ""}
                    placeholder="CVV: 3-4 digit kode"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="mb-8 text-xl font-semibold text-black">Rincian Harga</h3>
              <div className="grid grid-cols-2 gap-x-20">
                <div className="grid grid-flow-row gap-y-3 sm:gap-y-8">
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
        </Card>
      </form>
    </>
  );
};

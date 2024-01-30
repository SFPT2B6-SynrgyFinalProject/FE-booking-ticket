import React, { ChangeEvent } from "react";
import InputComponent from "../../../../../components/Input";
import { Card } from "../../../../../components/Card";
import { IFlightData } from "../../flights.types";
import useAction from "./booking.hooks";

interface BookingProps {
  formFlightData: IFlightData;
  setFormFlightData: React.Dispatch<React.SetStateAction<IFlightData>>;
}

export const Booking: React.FC<BookingProps> = ({ formFlightData, setFormFlightData }) => {
  const { flightOrderData } = useAction();

  const adultLength = flightOrderData.passengerDetails.adult.length;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;

    if ((name === "call" && checked) || (name === "call1" && checked)) {
      setFormFlightData({ ...formFlightData, [name]: e.target.id });
    } else {
      setFormFlightData({ ...formFlightData, [name]: value });
    }
  };

  // flightOrderData.passengerDetails.adult.map((passenger, index, adultLength) => {
  // console.log(index);
  //   console.log(adultLength.length);
  // });

  // console.log(adultLength);
  // console.log(formFlightData);
  // console.log(flightOrderData.passengerDetails);

  return (
    <>
      {/* <form onSubmit={handleSubmitFlightOrder}> */}
      <form>
        <Card title="Detail Pemesan" customStyle="md:pt-10">
          <div className="grid grid-cols-1 gap-x-0 lg:grid-cols-2 lg:gap-x-20">
            <div className="flex flex-col mb-7">
              <InputComponent
                type="text"
                id="name"
                name="name"
                customStyle={`py-[16px] pl-[20px] pr-[20px]`}
                onChange={handleChange}
                value={formFlightData["name"] || ""}
                placeholder="Nama Lengkap"
              />
            </div>

            <div className="flex items-center mb-7">
              <div className="flex items-center mr-3 sm:mr-10">
                <input
                  type="radio"
                  name="call"
                  id="Tuan"
                  className="w-5 h-5"
                  checked={formFlightData.call === "Tuan"}
                  onChange={handleChange}
                />
                <label htmlFor="Tuan" className="ml-2 sm:ml-3 sm:text-lg text-gray-800 select-none">
                  Tuan
                </label>
              </div>

              <div className="flex items-center mr-3 sm:mr-10">
                <input
                  type="radio"
                  name="call"
                  id="Nyonya"
                  className="w-5 h-5"
                  checked={formFlightData.call === "Nyonya"}
                  onChange={handleChange}
                />
                <label
                  htmlFor="Nyonya"
                  className="ml-2 sm:ml-3 sm:text-lg text-gray-800 select-none"
                >
                  Nyonya
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="radio"
                  name="call"
                  id="Nona"
                  className="w-5 h-5"
                  checked={formFlightData.call === "Nona"}
                  onChange={handleChange}
                />
                <label htmlFor="Nona" className="ml-2 sm:ml-3 sm:text-lg text-gray-800 select-none">
                  Nona
                </label>
              </div>
            </div>

            <div className="flex flex-col mb-7">
              <InputComponent
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                customStyle={`py-[16px] pl-[20px] pr-[20px]`}
                onChange={handleChange}
                value={formFlightData["phoneNumber"] || ""}
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
                value={formFlightData["email"] || ""}
                placeholder="Alamat E-mail"
              />
            </div>
          </div>
        </Card>

        <Card title="Detail Penumpang" customStyle="mt-14 md:pt-10">
          <div>
            <h1 className="mt-4 mb-6 text-xl font-semibold text-black">
              Penumpang {adultLength} (Dewasa)
            </h1>
            {flightOrderData.passengerDetails.adult.map((passenger, index) => (
              <div
                key={index}
                className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-20 lg:items-start"
              >
                <div className="flex flex-col mb-7">
                  <InputComponent
                    type="text"
                    id="name1"
                    name="name1"
                    customStyle={`py-[16px] pl-[20px] pr-[20px]`}
                    onChange={handleChange}
                    value={formFlightData["name1"] || passenger}
                    placeholder="Nama Lengkap"
                  />
                  <span className="mt-3 ml-1 text-sm text-gray-500">
                    Isi sesuai KTP/Paspor/SIM (tanpa tanda baca dan gelar)
                  </span>
                </div>

                {index === 0 ? (
                  <div className="flex flex-col items-start lg:items-center justify-start mb-7">
                    <label className="relative inline-flex items-center cursor-pointer me-5">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-blue-700" />
                      <span className="ml-3 text-sm text-gray-800">Sama dengan pemesan</span>
                    </label>
                  </div>
                ) : (
                  ""
                )}

                <div className={`flex items-center ${index === 0 ? "" : "lg:pt-3"} mb-7 md:pl-1`}>
                  <div className="flex items-center mr-3 sm:mr-10">
                    <input
                      type="radio"
                      name="call1"
                      id="Tuan-1"
                      className="w-5 h-5"
                      checked={formFlightData.call1 === "Tuan-1"}
                      onChange={handleChange}
                    />
                    <label
                      htmlFor="Tuan-1"
                      className="ml-2 sm:ml-3 sm:text-lg text-gray-800 select-none"
                    >
                      Tuan
                    </label>
                  </div>

                  <div className="flex items-center mr-3 sm:mr-10">
                    <input
                      type="radio"
                      name="call1"
                      id="Nyonya-1"
                      className="w-5 h-5"
                      checked={formFlightData.call1 === "Nyonya-1"}
                      onChange={handleChange}
                    />
                    <label
                      htmlFor="Nyonya-1"
                      className="ml-2 sm:ml-3 sm:text-lg text-gray-800 select-none"
                    >
                      Nyonya
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="call1"
                      id="Nona-1"
                      className="w-5 h-5"
                      checked={formFlightData.call1 === "Nona-1"}
                      onChange={handleChange}
                    />
                    <label
                      htmlFor="Nona-1"
                      className="ml-2 sm:ml-3 sm:text-lg text-gray-800 select-none"
                    >
                      Nona
                    </label>
                  </div>
                </div>
              </div>
            ))}

            {/*  */}
          </div>

          {/* <div>
            <h1 className="mt-4 mb-6 text-xl font-semibold text-black">Penumpang 2 (Anak)</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-20">
              <div className="flex flex-col mb-7">
                <InputComponent
                  type="text"
                  id="name1"
                  name="name1"
                  customStyle={`py-[16px] pl-[20px] pr-[20px]`}
                  // onChange={handleChange}
                  // value={formFlightData["name1"] || ""}
                  placeholder="Nama Lengkap"
                />
              </div>

              <div className="flex items-center mb-7 md:pl-1">
                <div className="flex items-center mr-3 sm:mr-10">
                  <input
                    type="radio"
                    name="call1"
                    id="Tuan-1"
                    className="w-5 h-5"
                    // checked={formFlightData.call1 === "Tuan-1"}
                    // onChange={handleChange}
                  />
                  <label
                    htmlFor="Tuan-1"
                    className="ml-2 sm:ml-3 sm:text-lg text-gray-800 select-none"
                  >
                    Tuan
                  </label>
                </div>

                <div className="flex items-center mr-3 sm:mr-10">
                  <input
                    type="radio"
                    name="call1"
                    id="Nyonya-1"
                    className="w-5 h-5"
                    // checked={formFlightData.call1 === "Nyonya-1"}
                    // onChange={handleChange}
                  />
                  <label
                    htmlFor="Nyonya-1"
                    className="ml-2 sm:ml-3 sm:text-lg text-gray-800 select-none"
                  >
                    Nyonya
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="radio"
                    name="call1"
                    id="Nona-1"
                    className="w-5 h-5"
                    // checked={formFlightData.call1 === "Nona-1"}
                    // onChange={handleChange}
                  />
                  <label
                    htmlFor="Nona-1"
                    className="ml-2 sm:ml-3 sm:text-lg text-gray-800 select-none"
                  >
                    Nona
                  </label>
                </div>
              </div>
            </div>
          </div> */}
        </Card>
      </form>

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

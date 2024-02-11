import InputComponent from "../../../../../components/Input";
import { Card } from "../../../../../components/Card";
import useAction from "./payment.hooks";
import { rupiahFormatter } from "../../../../../lib/rupiahFormatter";
import Button from "../../../../../components/Button";
import Alert from "../../../../../components/Alert";
import { Icon } from "@iconify/react/dist/iconify.js";
import { formatDateString, formatTimeHoursMinute } from "../../../../../lib";

import { useDispatch } from "react-redux";

export const Payment = () => {
  const dispatch = useDispatch();
  const {
    isLoading,
    paymentData,
    totalPassengersPrice,
    totalDiscount,
    totalTax,
    grandTotal,
    handleChange,
    handleSubmitPayment,
    adultDetails,
    childDetails,
    infantDetails,
    alert,
    isButtonDisabled,
    errorMessage,
    resultData,
  } = useAction({ dispatch });

  const API_URL: string | undefined = process.env.VITE_API_URL;
  const data = resultData.data;

  const {
    orderId,
    facility,
    flightDetails: {
      airline: { iconUrl, name: airlineName },
      flightCode,
      departure: {
        dateTime: departureDate,
        city: departureCity,
        code: departureCode,
        airportName: departureAirport,
      },
      arrival: {
        dateTime: arrivalDate,
        city: arrivalCity,
        code: arrivalCode,
        airportName: arrivalAirport,
      },
    },
    orderer: { fullName, email, phoneNumber },
    flightClass: className,
    passengerDetails: { adult, child, infant },
    paymentStatus,
  } = data;

  const formattedDepartureDate = formatDateString(departureDate);
  const formattedArrivalDate = formatDateString(arrivalDate);

  return (
    <>
      {alert && (
        <div>
          {alert.type === "success" && <Alert message={alert.message} type="success" />}
          {alert.type === "fail" && (
            <Alert message={Object.values(alert.data).join("\n")} type="fail" />
          )}
          {alert.type === "process" && <Alert message={alert.message} type="process" />}
        </div>
      )}
      <Card title="Informasi Pemesanan" customStyle="lg:px-16 mb-12">
        <div>
          <div className="grid grid-cols-3 pt-3 text-xs sm:text-sm lg:grid-cols-9 mt-9 gap-x-5 md:text-base">
            <div className="flex items-center justify-center col-span-3 pb-10 sm:pb-8 lg:col-span-2 lg:justify-start lg:pb-0">
              <img src={`${API_URL}${iconUrl}`} className="w-40" alt="Airline Icon" />
            </div>

            <div className="relative flex flex-col justify-between pl-3 pr-4 border-r-2 border-gray-500 border-dotted lg:col-span-2">
              <div className="absolute -right-[26px] -top-6">
                <Icon icon={"mdi:dot"} width={50} className="text-gray-500" />
              </div>
              <div className="absolute -right-[26px] -bottom-6">
                <Icon icon={"mdi:dot"} width={50} className="text-gray-500" />
              </div>
              <div className="mb-3 font-semibold text-black">
                <h6>{airlineName}</h6>
                <h6>{flightCode}</h6>
              </div>
              <div>
                <p className="font-medium text-gray-500">{className}</p>
              </div>
            </div>

            <div className="flex flex-col justify-between lg:col-span-2 md:pl-12">
              <div>
                <h6 className="font-semibold text-black">{formatTimeHoursMinute(departureDate)}</h6>
                <p className="font-medium text-gray-500">{formattedDepartureDate}</p>
              </div>

              <div>
                <h6 className="font-semibold text-black">{formatTimeHoursMinute(arrivalDate)}</h6>
                <p className="font-medium text-gray-500">{formattedArrivalDate}</p>
              </div>
            </div>

            <div className="flex flex-col justify-between space-y-5 lg:col-span-3 md:pl-8">
              <div>
                <h6 className="font-semibold text-black">
                  {departureCity} ({departureCode})
                </h6>
                <p className="font-medium text-gray-500">{departureAirport}</p>
              </div>

              <div>
                <h6 className="font-semibold text-black">
                  {arrivalCity} ({arrivalCode})
                </h6>
                <p className="font-medium text-gray-500">{arrivalAirport}</p>
              </div>
            </div>
          </div>

          <div className="grid justify-start py-8 lg:py-10 lg:justify-between lg:grid-cols-2">
            <div>
              <h2 className="pb-2 text-lg font-semibold sm:pb-4 sm:text-xl">Detail Pemesanan</h2>
              <table className="text-sm font-medium text-gray-600 sm:text-base">
                <tbody>
                  <tr>
                    <td className="py-1 pr-8">Booking ID</td>
                    <td>
                      : <span className="pl-3">{orderId.toUpperCase()}</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-1 pr-5">Status Pembayaran</td>
                    <td>
                      :{" "}
                      <span className="pl-3 font-semibold text-rose-600">
                        {paymentStatus.toUpperCase()}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-1 pr-8">Total Penumpang</td>
                    <td>
                      : <span className="pl-3">{data.passengerDetails.passengerTotal} Orang</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="flex flex-col justify-start mt-8 lg:mt-0 lg:flex-row">
              <h2 className="text-lg font-semibold sm:text-xl ">Fasilitas</h2>

              <div className="text-sm font-medium text-gray-600 sm:text-base lg:ml-36">
                {facility.map((facilityItem, index) => (
                  <div key={index} className="py-1">
                    <p>{facilityItem.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid justify-start lg:pt-1 lg:justify-between lg:grid-cols-2">
            <div>
              <h2 className="text-lg font-semibold sm:text-xl">Informasi Kontak</h2>
              <div className="pt-2 sm:pt-4">
                <table className="text-sm font-medium text-gray-600 sm:text-base">
                  <tbody>
                    <tr>
                      <td className="py-1 sm:pr-5">Nama Lengkap</td>
                      <td>
                        : <span className="sm:pl-3">{fullName}</span>
                      </td>
                    </tr>

                    <tr>
                      <td>Alamat Email</td>
                      <td className="py-1">
                        : <span className="sm:pl-3">{email}</span>
                      </td>
                    </tr>

                    <tr>
                      <td>Nomor Telepon</td>
                      <td className="py-1">
                        : <span className="sm:pl-3">{phoneNumber}</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-8 lg:mt-0">
              <h2 className="text-lg font-semibold sm:text-xl">Informasi Penumpang</h2>
              <div className="pt-2 sm:pt-4">
                <table className="text-sm font-medium text-gray-600 sm:text-base">
                  <tbody>
                    {Array.isArray(adult) && adult?.length > 0 && (
                      <>
                        {adult.map((passenger, index) => (
                          <tr key={index}>
                            <td className="py-1 sm:pr-3">{index + 1}.</td>
                            <td>{passenger}</td>
                            <td className="pl-2 sm:pl-5">(Dewasa)</td>
                          </tr>
                        ))}
                      </>
                    )}

                    {Array.isArray(child) && child?.length > 0 && (
                      <>
                        {child.map((passenger, index) => (
                          <tr key={index}>
                            <td className="py-1 sm:pr-3">{(adult?.length || 0) + index + 1}.</td>
                            <td>{passenger}</td>
                            <td className="pl-2 sm:pl-5">(Anak)</td>
                          </tr>
                        ))}
                      </>
                    )}

                    {Array.isArray(infant) && infant?.length > 0 && (
                      <>
                        {infant.map((passenger, index) => (
                          <tr key={index}>
                            <td className="py-1 sm:pr-3">
                              {(adult?.length || 0) + (child?.length || 0) + index + 1}.
                            </td>
                            <td>{passenger}</td>
                            <td className="pl-2 sm:pl-5">(Bayi)</td>
                          </tr>
                        ))}
                      </>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <form onSubmit={handleSubmitPayment}>
        <Card title="Metode Pembayaran" customStyle="lg:px-16">
          <div className="grid grid-cols-1 mt-10 lg:grid-cols-2 lg:gap-x-40">
            <div className="mb-5 lg:mb-0">
              <div className="flex items-center mb-7">
                <div className="flex items-center mr-10">
                  <input
                    type="radio"
                    name="paymentMethod"
                    id="creditCard"
                    className="w-5 h-5"
                    onChange={handleChange}
                    value={"creditCard"}
                    required
                  />
                  <label htmlFor="creditCard" className="ml-3 text-lg text-gray-800 select-none">
                    Kartu Kredit
                  </label>
                </div>

                <div className="flex items-center mr-10">
                  <input
                    type="radio"
                    name="paymentMethod"
                    id="debit"
                    className="w-5 h-5"
                    onChange={handleChange}
                    value={"debit"}
                    required
                  />
                  <label htmlFor="debit" className="ml-3 text-lg text-gray-800 select-none">
                    Debit
                  </label>
                </div>
              </div>
              <div className="flex flex-col mb-7">
                <InputComponent
                  type="number"
                  id="cardNumber"
                  name="cardNumber"
                  customStyle={`py-[16px] pl-[20px] pr-[20px]`}
                  onChange={handleChange}
                  value={paymentData["cardNumber"] || ""}
                  placeholder="Nomor Kartu Kredit"
                  required
                />
              </div>

              <div className="flex flex-col mb-7">
                <InputComponent
                  type="text"
                  id="cardName"
                  name="cardName"
                  customStyle={`py-[16px] pl-[20px] pr-[20px]`}
                  onChange={handleChange}
                  value={paymentData["cardName"] || ""}
                  placeholder="Nama yang Tertera di Kartu Kredit"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-x-4">
                <div className="flex flex-col mb-7">
                  <InputComponent
                    type="text"
                    id="expiredDate"
                    name="expiredDate"
                    customStyle={`py-[16px] pl-[20px] pr-[20px]`}
                    onChange={handleChange}
                    value={paymentData["expiredDate"] || ""}
                    placeholder="Masa Berlaku: MM/YY"
                    required
                  />
                  {errorMessage && (
                    <span className="pt-1 text-sm font-medium text-red-500">*{errorMessage}</span>
                  )}
                </div>
                <div className="flex flex-col mb-7">
                  <InputComponent
                    type="number"
                    id="cvv"
                    name="cvv"
                    customStyle={`py-[16px] pl-[20px] pr-[20px]`}
                    onChange={handleChange}
                    value={paymentData["cvv"] || ""}
                    placeholder="CVV: 3-4 digit kode"
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="mb-8 text-xl font-semibold text-black">Rincian Harga</h3>
              <div className="grid grid-cols-2 gap-x-20">
                <div className="grid grid-flow-row gap-y-3 sm:gap-y-8">
                  <span className="font-medium text-gray-600">
                    Harga Dewasa (x{adultDetails.totalCount})
                  </span>
                  {childDetails.totalCount === 0 ? (
                    ""
                  ) : (
                    <span className="font-medium text-gray-600">
                      Harga Anak (x{childDetails.totalCount})
                    </span>
                  )}
                  {infantDetails.totalCount === 0 ? (
                    ""
                  ) : (
                    <span className="font-medium text-gray-600">
                      Harga Bayi (x{infantDetails.totalCount})
                    </span>
                  )}
                  <span className="font-medium text-gray-600">Subtotal</span>
                  <span className="font-medium text-gray-600">Diskon</span>
                  <span className="font-medium text-gray-600">Pajak</span>
                  <span className="font-semibold">Total Bayar</span>
                </div>

                <div className="flex flex-col items-end justify-between">
                  <span className="font-medium text-gray-600">
                    {rupiahFormatter(adultDetails.totalPrice)}
                  </span>
                  {childDetails.totalCount === 0 ? (
                    ""
                  ) : (
                    <span className="font-medium text-gray-600">
                      {rupiahFormatter(childDetails.totalPrice)}
                    </span>
                  )}
                  {infantDetails.totalCount === 0 ? (
                    ""
                  ) : (
                    <span className="font-medium text-gray-600">
                      {rupiahFormatter(infantDetails.totalPrice)}
                    </span>
                  )}
                  <span className="font-medium text-gray-600">
                    {rupiahFormatter(totalPassengersPrice)}
                  </span>
                  <span className="font-medium text-gray-600">
                    -{rupiahFormatter(totalDiscount)}
                  </span>
                  <span className="font-medium text-gray-600">{rupiahFormatter(totalTax)}</span>
                  <span className="font-semibold text-blue-600">{rupiahFormatter(grandTotal)}</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <div className="flex flex-col pb-10 mx-auto mt-16 md:w-3/6 lg:w-2/6 md:mt-28 gap-y-4">
          <Button
            type="primary-dark"
            width="full"
            color="primary-dark"
            disabled={isButtonDisabled || isLoading}
          >
            {isLoading ? "Loading ..." : "Lanjutkan Pembayaran"}
          </Button>
        </div>
      </form>
    </>
  );
};

import { Icon } from "@iconify/react/dist/iconify.js";
import { ContainerPage } from "../../../../components/common-page/ContainerPage";
import { Card } from "../../../../components/Card";
// import Button from "../../../../components/Button";
import { Link } from "react-router-dom";
import DownloadTicket from "../../../../components/DownloadTicket";
import { formatTimeHoursMinute, rupiahFormatter } from "../../../../lib";
import useAction from "./history.hooks";
import Skeleton from "react-loading-skeleton";

export default function History() {
  const { orderHistory, calculateTimeRange, getLoading, loading, ticket, timeFormatterForDetail } =
    useAction();

  const {
    orderId,
    flightDetails: { departure, arrival },
    priceDetails: { basePriceBreakdown, totalDicount, total },
    passengerDetails,
  } = orderHistory || {};

  const departureDateTime = departure?.dateTime;
  const arrivalDateTime = arrival?.dateTime;

  return (
    <>
      <ContainerPage>
        <Card customStyle="sm:px-0 hide-on-print">
          <div className="w-full pb-8 mt-2 mb-10 border-b-2 border-gray-500/70">
            <div className="flex flex-col items-center lg:flex-row">
              <Link to="/pesanan">
                <div className="flex items-center justify-start">
                  <h3 className="pl-2 text-2xl font-bold">
                    <Icon icon="ic:outline-keyboard-arrow-left" width={30} />
                  </h3>
                  <h3 className="px-3 text-2xl font-bold">Detail Pesanan Anda</h3>
                </div>
              </Link>
            </div>
          </div>

          {loading || getLoading.isLoading ? (
            <div className="grid grid-cols-2 gap-x-10 gap-y-7">
              <Skeleton className="w-full mx-auto h-36 rounded-2xl" />
              <Skeleton className="w-full mx-auto h-36 rounded-2xl" />
              <Skeleton className="w-full mx-auto h-36 rounded-2xl" />
              <Skeleton className="w-full mx-auto h-36 rounded-2xl" />
            </div>
          ) : (
            <>
              <div className="flex flex-col items-start justify-center lg:flex-row">
                <div className="ml-5 sm:ml-12 lg:w-1/2">
                  <h4 className="mb-3 text-xl font-bold">Keberangkatan & Penumpang</h4>
                  <div className="">
                    <p className="py-4 text-sm font-semibold">Order id: {orderId}</p>
                    <div className="flex">
                      <div className="flex my-auto">
                        <p className="text-sm font-semibold">
                          {calculateTimeRange(departureDateTime, arrivalDateTime)}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <div className="flex flex-col items-center p-2">
                          <div className="h-40 border border-gray-800 border-dashed"></div>
                          <div className="w-2 h-2 bg-gray-800 rounded-full"></div>
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <div className="flex flex-col">
                          <p className="text-base font-semibold">
                            {`${timeFormatterForDetail(departureDateTime)} ${formatTimeHoursMinute(
                              departureDateTime
                            )}`}
                          </p>
                          <p className="text-sm">{departure.city}</p>
                        </div>
                        <div className="flex items-center">
                          <p className="py-8 text-sm">
                            {calculateTimeRange(departureDateTime, arrivalDateTime)} Langsung
                          </p>
                        </div>
                        <div className="flex flex-col">
                          <p className="text-base font-semibold">
                            {`${timeFormatterForDetail(arrivalDateTime)} ${formatTimeHoursMinute(
                              arrivalDateTime
                            )}`}
                          </p>
                          <p className="text-sm">{arrival.city}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 lg:mt-3">
                    <div className="pt-2 sm:pt-4">
                      <table className="text-sm font-semibold text-gray-700">
                        <tbody>
                          {Array.isArray(passengerDetails.adult) &&
                            passengerDetails.adult?.length > 0 && (
                              <>
                                {passengerDetails.adult.map((passenger, index) => (
                                  <tr key={index}>
                                    <td className="py-1 sm:pr-3">{index + 1}.</td>
                                    <td>{passenger}</td>
                                    <td className="pl-2 font-medium text-center sm:pl-5">
                                      (Dewasa)
                                    </td>
                                  </tr>
                                ))}
                              </>
                            )}

                          {Array.isArray(passengerDetails.child) &&
                            passengerDetails.child?.length > 0 && (
                              <>
                                {passengerDetails.child.map((passenger, index) => (
                                  <tr key={index}>
                                    <td className="py-1 sm:pr-3">
                                      {(passengerDetails.adult?.length || 0) + index + 1}.
                                    </td>
                                    <td>{passenger}</td>
                                    <td className="pl-2 font-medium text-center sm:pl-5">(Anak)</td>
                                  </tr>
                                ))}
                              </>
                            )}

                          {Array.isArray(passengerDetails.infant) &&
                            passengerDetails.infant?.length > 0 && (
                              <>
                                {passengerDetails.infant.map((passenger, index) => (
                                  <tr key={index}>
                                    <td className="py-1 sm:pr-3">
                                      {(passengerDetails.adult?.length || 0) +
                                        (passengerDetails.child?.length || 0) +
                                        index +
                                        1}
                                      .
                                    </td>
                                    <td>{passenger}</td>
                                    <td className="pl-2 font-medium text-center sm:pl-5">(Bayi)</td>
                                  </tr>
                                ))}
                              </>
                            )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <div className="mt-8 ml-5 sm:ml-12 lg:mt-0 lg:w-1/2">
                  <h3 className="mb-5 text-[1.35rem] font-bold">Fasilitas</h3>
                  <div className="flex flex-col pb-10">
                    <div className="font-semibold text-blue-700">
                      {orderHistory.facility.map((facilityItem, index) => (
                        <div key={index} className="flex items-center py-1">
                          <Icon
                            icon={"ri:luggage-cart-line"}
                            width={20}
                            className="mr-3 text-gray-700"
                          />{" "}
                          <p className="text-sm">{facilityItem.name}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <h3 className="mb-5 text-xl font-bold">Detail Pembayaran</h3>
                  <div className="grid grid-cols-2 mr-5 gap-x-20">
                    <div className="grid grid-flow-row text-sm font-semibold text-gray-800 sm:text-base gap-y-3 sm:gap-y-6">
                      <span>
                        Harga Dewasa (x
                        {basePriceBreakdown.adult.passengerCount})
                      </span>

                      {basePriceBreakdown.child.passengerCount === 0 ? (
                        ""
                      ) : (
                        <span>
                          Harga Anak (x
                          {basePriceBreakdown.child.passengerCount})
                        </span>
                      )}

                      {basePriceBreakdown.infant.passengerCount === 0 ? (
                        ""
                      ) : (
                        <span>
                          Harga Bayi (x
                          {basePriceBreakdown.infant.passengerCount})
                        </span>
                      )}
                      <span>Diskon</span>
                      <span>Pajak</span>
                      <span>Total</span>
                    </div>
                    <div className="flex flex-col items-end justify-between text-sm font-semibold text-gray-800 sm:text-base">
                      <span>{rupiahFormatter(basePriceBreakdown.adult.price)}</span>

                      {basePriceBreakdown.child.price === 0 ? (
                        ""
                      ) : (
                        <span>{rupiahFormatter(basePriceBreakdown.child.price)}</span>
                      )}

                      {basePriceBreakdown.infant.price === 0 ? (
                        ""
                      ) : (
                        <span>{rupiahFormatter(basePriceBreakdown.infant.price)}</span>
                      )}
                      <span>-{rupiahFormatter(totalDicount)}</span>
                      <span>Termasuk</span>

                      <span className="text-blue-700">{rupiahFormatter(total)}</span>
                    </div>
                  </div>
                  {/* <div className="flex flex-col items-center justify-center mx-auto mt-10 w-80">
                    <Button
                      id="unduh-bukti-pembayaran"
                      type="primary-dark"
                      color="primary-dark"
                      className="mb-4"
                      width="full"
                    >
                      Unduh Bukti Pembayaran
                    </Button>

                    <Button
                      id="unduh-e-tiket"
                      type="primary-dark"
                      color="primary-dark"
                      width="full"
                    >
                      Unduh E-tiket
                    </Button>
                  </div> */}
                </div>
              </div>
            </>
          )}
        </Card>

        {loading || getLoading.isLoading ? (
          <div className="mt-28">
            <Skeleton className="flex mx-auto h-14 w-72 rounded-3xl" />
          </div>
        ) : (
          <DownloadTicket dataFlightOrder={ticket} />
        )}
      </ContainerPage>
    </>
  );
}

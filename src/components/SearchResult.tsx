import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../config/redux/store";
import {
  setDataBySearch,
  setGetTicket,
  setIsLoading,
  setNumberPagination,
} from "../config/redux/action";
import { getFlightTicket } from "../lib/services/flightTicket";
import { NavigateFunction, useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { GetTicketType } from "../config/redux/reducer/getTicketReducer";
const API_URL: string = import.meta.env.VITE_API_URL;

interface ResultCardType {
  departureAirportName: string;
  arrivalAirportName: string;
  facilityName: string[];
  passengerCountForAdult: number;
  passengerCountForChild: number;
  passengerCountForInfant: number;
  departureTime: string;
  arrivalTime: string;
  departureAirportCode: string;
  arrivalAirportCode: string;
  iconFlight: string;
  durationInMin: string;
  luggage: number;
  basePricePerPerson: number;
  discountedPricePerPerson: number;
  totalDicount: number;
  totalPrice: number;
  classId: string | number;
  ticketId: string | number;
}

function ResultCard({
  departureAirportName,
  arrivalAirportName,
  facilityName,
  passengerCountForAdult,
  passengerCountForChild,
  passengerCountForInfant,
  departureTime,
  arrivalTime,
  departureAirportCode,
  arrivalAirportCode,
  iconFlight,
  durationInMin,
  luggage,
  basePricePerPerson,
  discountedPricePerPerson,
  totalDicount,
  totalPrice,
  classId,
  ticketId,
}: ResultCardType) {
  const [isExpanded, setExpanded] = useState(false);
  const getLoading = useSelector((state: RootState) => state.isLoadingReducer);
  const dispatch = useDispatch<AppDispatch>();
  const navigate: NavigateFunction = useNavigate();

  const convertToLocaleStringOfNumber = (num: number) => {
    return num.toLocaleString("id").replace(/\./g, ",");
  };

  const handleExpandToggle = () => {
    setExpanded(!isExpanded);
  };

  const getHour = (date: string) => {
    const getDate = new Date(date);
    const hour = getDate.getUTCHours();
    const minute = getDate.getUTCMinutes();
    const formattedHour = hour < 10 ? `0${hour.toString()}` : hour.toString();
    const formattedMinute =
      minute < 10 ? `0${minute.toString()}` : minute.toString();
    return `${formattedHour} : ${formattedMinute}`;
  };

  const timeFormatterForDetail = (time: string) => {
    const date = new Date(time);
    const formatter = new Intl.DateTimeFormat("id-ID", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
    const formatted = formatter.format(date);
    return formatted;
  };

  const handleResultTicket = ({
    ticketId,
    classId,
    passengerDetails,
  }: GetTicketType) => {
    const payload = {
      ticketId,
      classId,
      passengerDetails,
    };
    dispatch(setGetTicket(payload));
    navigate("/penerbangan")
  };

  return (
    <>
      <div className="result-card rounded-[30px]">
        <div
          className={`result-card_summary lg:h-[200px] grid lg:grid-cols-4 max-sm:gap-8 ${
            isExpanded ? "shadow-md" : ""
          }`}
        >
          <div className="lg:col-span-3 h-full px-6 py-4">
            <div className="h-1/2 grid grid-cols-5 gap-7">
              <div className="col-span-1"></div>
              <div className="col-span-2">
                {getLoading.isLoading ? (
                  <>
                    <Skeleton className="h-16" />
                  </>
                ) : (
                  <>
                    <img
                      src={iconFlight}
                      className="mx-auto"
                      alt="garuda"
                      width={100}
                    />
                  </>
                )}
              </div>
              <div className="col-span-1"></div>
              <div className="col-span-1"></div>
            </div>
            <div className="h-1/2 grid grid-cols-5 gap-7">
              {getLoading.isLoading ? (
                <>
                  <Skeleton className="h-16" />
                </>
              ) : (
                <>
                  <div className="col-span-1 text-center">
                    <h2 className="time text-[22px] text-neutral-800 font-outfit leading-7">
                      {getHour(departureTime)}
                    </h2>
                    <p className="mt-3 text-neutral-800 font-outfit font-semibold">
                      {departureAirportCode}
                    </p>
                  </div>
                </>
              )}
              <div className="col-span-2 text-center">
                {getLoading.isLoading ? (
                  <>
                    <Skeleton className="h-16" />
                  </>
                ) : (
                  <>
                    <p className="text-sm text-neutral-900 font-outfit leading-[26px] tracking-[-0.15px]">
                      {durationInMin}
                    </p>
                    <div className="relative border-t-2 border-dotted border-[#222] my-[4px]">
                      <div className="absolute right-0 -top-1 w-[6px] aspect-square rounded-full bg-[#222]"></div>
                    </div>
                    <p className="text-sm text-neutral-900 font-outfit leading-[26px] tracking-[-0.15px]">
                      Langsung
                    </p>
                  </>
                )}
              </div>
              <div className="col-span-1 text-center">
                {getLoading.isLoading ? (
                  <>
                    <Skeleton className="h-16" />
                  </>
                ) : (
                  <>
                    <h2 className="time text-[22px] text-neutral-800 font-outfit leading-7">
                      {getHour(arrivalTime)}
                    </h2>
                    <p className="mt-3 text-neutral-800 font-outfit font-semibold">
                      {arrivalAirportCode}
                    </p>
                  </>
                )}
              </div>
              <div className="col-span-1">
                {getLoading.isLoading ? (
                  <>
                    <Skeleton className="h-5 w-10" />
                  </>
                ) : (
                  <>
                    <div className="rounded py-[4px] px-[2px] shadow-sm flex gap-1 items-center w-fit bg-gray-100">
                      <Icon icon="ri:luggage-cart-line" />
                      <p className="text-sm font-outfit text-neutral-800">
                        {luggage}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="lg:col-span-1 h-full max-md:border-t-2 lg:border-l-2 border-[#222] border-dotted flex flex-col max-sm:gap-4 justify-between items-center py-5">
            <div className="text-base text-neutral-800 font-outfit">
              {getLoading.isLoading ? (
                <>
                  <Skeleton className="w-36 h-5" />
                </>
              ) : (
                <>
                  <h6>Total Harga</h6>
                </>
              )}
            </div>
            <div className="text-end">
              {getLoading.isLoading ? (
                <>
                  <Skeleton className="w-36 h-7" />
                </>
              ) : (
                <>
                  <span className="text-sm text-neutral-800 font-outfit font-semibold line-through">
                    {`IDR ${convertToLocaleStringOfNumber(basePricePerPerson)}`}
                  </span>
                </>
              )}
              {getLoading.isLoading ? (
                <>
                  <Skeleton className="w-36 h-7" />
                </>
              ) : (
                <>
                  <p className="font-medium text-xl text-secondary-danger font-outfit">
                    IDR{" "}
                    {convertToLocaleStringOfNumber(discountedPricePerPerson)}
                    <span className="text-base text-neutral-800">/ pax</span>
                  </p>
                </>
              )}
            </div>
            {getLoading.isLoading ? (
              <>
                <Skeleton className="w-36 h-5" />
              </>
            ) : (
              <>
                <p
                  onClick={handleExpandToggle}
                  className="text-base text-primary-normal font-outfit cursor-pointer"
                >
                  Lihat Detail
                </p>
              </>
            )}
          </div>
        </div>
        {isExpanded && (
          <div className="result-card_detail px-10 py-8 grid grid-cols-1 lg:grid-cols-2 md:gap-x-20 gap-y-16 md:gap-y-6">
            <div className="flight-detail col-span-1">
              {getLoading.isLoading ? (
                <>
                  <Skeleton className="w-36 h-5" />
                </>
              ) : (
                <>
                  <h2 className="font-sans text-neutral-800 font-semibold">
                    Detail Penerbangan
                  </h2>
                </>
              )}
              <div className="mt-10">
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0">
                    {getLoading.isLoading ? (
                      <>
                        <Skeleton className="w-20 h-5" />
                      </>
                    ) : (
                      <>
                        <p className="text-sm font-normal text-neutral-800 font-outfit">
                          {durationInMin}
                        </p>
                      </>
                    )}
                  </div>
                  <div className="flex flex-col gap-9 pl-3 border-l-2 border-[#444] border-dotted relative">
                    <div className="absolute w-3 h-3 rounded-full bg-[#444] -left-[7px] -bottom-1"></div>
                    <div>
                      {getLoading.isLoading ? (
                        <>
                          <Skeleton className="w-36 h-5" />
                        </>
                      ) : (
                        <>
                          <h6 className="font-sans font-semibold text-neutral-800">
                            {`${timeFormatterForDetail(
                              departureTime
                            )} ${getHour(departureTime)}`}
                          </h6>
                        </>
                      )}
                      {getLoading.isLoading ? (
                        <>
                          <Skeleton className="w-36 h-3" />
                        </>
                      ) : (
                        <>
                          <p className="text-xs text-neutral-900 font-sans">
                            {departureAirportName}
                          </p>
                        </>
                      )}
                    </div>
                    <div className="flex gap-2 items-center">
                      {getLoading.isLoading ? (
                        <>
                          <Skeleton className="w-36 h-6" />
                        </>
                      ) : (
                        <>
                          <Icon icon="fa6-solid:cart-flatbed-suitcase" />
                          <div>
                            <p
                              className="text-xs text-neutral-900 font-sans font-semibold"
                              dangerouslySetInnerHTML={{
                                __html: facilityName.join("<br/>"),
                              }}
                            />
                          </div>
                        </>
                      )}
                    </div>
                    <div>
                      {getLoading.isLoading ? (
                        <>
                          <Skeleton className="w-36 h-5" />
                        </>
                      ) : (
                        <>
                          <h6 className="font-sans font-semibold text-neutral-800">
                            {`${timeFormatterForDetail(arrivalTime)} ${getHour(
                              arrivalTime
                            )}`}
                          </h6>
                        </>
                      )}
                      {getLoading.isLoading ? (
                        <>
                          <Skeleton className="w-36 h-3" />
                        </>
                      ) : (
                        <>
                          <p className="text-xs text-neutral-900 font-sans">
                            {arrivalAirportName}
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="price-detail col-span-1">
              {getLoading.isLoading ? (
                <>
                  <Skeleton className="w-36 h-5" />
                </>
              ) : (
                <>
                  <h2 className="font-sans text-neutral-800 font-semibold">
                    Detail Harga
                  </h2>
                </>
              )}
              <div className="mt-10 flex flex-col gap-4">
                <div className="flex justify-between w-full text-sm text-neutral-700 text-sans">
                  {getLoading.isLoading ? (
                    <>
                      <Skeleton className="w-36 h-3" />
                    </>
                  ) : (
                    <>
                      <p>Harga Dewasa (x{passengerCountForAdult})</p>
                    </>
                  )}
                  {getLoading.isLoading ? (
                    <>
                      <Skeleton className="w-24 h-3" />
                    </>
                  ) : (
                    <p>
                      {convertToLocaleStringOfNumber(
                        basePricePerPerson * passengerCountForAdult
                      )}
                    </p>
                  )}
                </div>
                {passengerCountForChild !== 0 && (
                  <div className="flex justify-between w-full text-sm text-neutral-700 text-sans">
                    {getLoading.isLoading ? (
                      <>
                        <Skeleton className="w-36 h-3" />
                      </>
                    ) : (
                      <>
                        <p>Harga Anak (x{passengerCountForChild})</p>
                      </>
                    )}
                    {getLoading.isLoading ? (
                      <>
                        <Skeleton className="w-24 h-3" />
                      </>
                    ) : (
                      <p>
                        {convertToLocaleStringOfNumber(
                          basePricePerPerson * passengerCountForChild
                        )}
                      </p>
                    )}
                  </div>
                )}
                {passengerCountForInfant !== 0 && (
                  <div className="flex justify-between w-full text-sm text-neutral-700 text-sans">
                    {getLoading.isLoading ? (
                      <>
                        <Skeleton className="w-36 h-3" />
                      </>
                    ) : (
                      <>
                        <p>Harga Bayi (x{passengerCountForInfant})</p>
                      </>
                    )}
                    {getLoading.isLoading ? (
                      <>
                        <Skeleton className="w-24 h-3" />
                      </>
                    ) : (
                      <>
                        <p>
                          {Math.floor(
                            ((basePricePerPerson * 10) / 100) *
                              passengerCountForInfant
                          )
                            .toLocaleString("id")
                            .replace(/\./g, ",")}
                        </p>
                      </>
                    )}
                  </div>
                )}
                <div className="flex justify-between w-full text-sm text-neutral-700 text-sans">
                  {getLoading.isLoading ? (
                    <>
                      <Skeleton className="w-36 h-3" />
                    </>
                  ) : (
                    <>
                      <p>Diskon</p>
                    </>
                  )}
                  {getLoading.isLoading ? (
                    <>
                      <Skeleton className="w-24 h-3" />
                    </>
                  ) : (
                    <>
                      <p>-IDR {convertToLocaleStringOfNumber(totalDicount)}</p>
                    </>
                  )}
                </div>
                <div className="flex justify-between w-full text-sm text-neutral-700 text-sans">
                  {getLoading.isLoading ? (
                    <>
                      <Skeleton className="w-36 h-3" />
                    </>
                  ) : (
                    <>
                      <p>Pajak</p>
                    </>
                  )}
                  {getLoading.isLoading ? (
                    <>
                      <Skeleton className="w-24 h-3" />
                    </>
                  ) : (
                    <>
                      <p>Termasuk</p>
                    </>
                  )}
                </div>
                <div className="flex justify-between w-full text-sm text-neutral-700 text-sans">
                  {getLoading.isLoading ? (
                    <>
                      <Skeleton className="w-36 h-3" />
                    </>
                  ) : (
                    <>
                      <p>Total</p>
                    </>
                  )}
                  {getLoading.isLoading ? (
                    <>
                      <Skeleton className="w-24 h-3" />
                    </>
                  ) : (
                    <>
                      <p>IDR {convertToLocaleStringOfNumber(totalPrice)} </p>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="lg:col-span-2 w-full flex justify-end">
              <button
                type="submit"
                onClick={() =>
                  handleResultTicket({
                    ticketId,
                    classId,
                    passengerDetails: {
                      adult: passengerCountForAdult,
                      child: passengerCountForChild,
                      infant: passengerCountForInfant,
                    },
                  })
                }
                className="block py-2 px-4 rounded-[10px] bg-primary-normal font-outfit text-white font-medium"
              >
                {getLoading.isLoading ? (
                  <>
                    <Skeleton className="w-10" />
                  </>
                ) : (
                  <>Pilih Tiket</>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default function SearchResult() {
  const dispatch = useDispatch<AppDispatch>();
  const getDataBySearch = useSelector(
    (state: RootState) => state.getDataBySearchReducer
  );
  const resultSearch = useSelector(
    (state: RootState) => state.resultSearchReducer
  );

  // const resultTicket = useSelector(
  //   (state: RootState) => state.getTicketReducer
  // ); => for get result ticket

  const getLoading = useSelector((state: RootState) => state.isLoadingReducer);
  const getNumberPagination = useSelector(
    (state: RootState) => state.numberPaginationReducer
  );
  const lastPage: number = getDataBySearch.data.lastPage + 1;
  const navigate: NavigateFunction = useNavigate();
  const getDurationInHour = (date: number) => {
    const hour = Math.floor(date / 60);
    const minute = date % 60;
    return `${hour} jam ${minute === 0 ? "" : `${minute} menit`}`;
  };
  const handleNextPage = async () => {
    try {
      dispatch(setIsLoading(true));
      const result = await getFlightTicket({
        ...resultSearch,
        page: getNumberPagination.num,
      });
      dispatch(setDataBySearch(result));
      dispatch(setNumberPagination(getNumberPagination.num + 1));
      navigate("/search");
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  const handlePrevPage = async () => {
    try {
      dispatch(setIsLoading(true));
      const result = await getFlightTicket({
        ...resultSearch,
        page: getNumberPagination.num - 2,
      });
      dispatch(setDataBySearch(result));
      dispatch(setNumberPagination(getNumberPagination.num - 1));
      navigate("/search");
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  return (
    <>
      <div className="search-result-container flex flex-col gap-5 lg:col-span-2">
        {getDataBySearch.data.availableFlight.map((data) => {
          const sortedFacility = [...data.ticketDetails.facility].sort(
            (a, b) => a.id - b.id
          );
          const facilityName = sortedFacility.map((facility) => facility.name);

          return (
            <ResultCard
              departureAirportName={data.ticketDetails.departure.airportName}
              arrivalAirportName={data.ticketDetails.arrival.airportName}
              facilityName={facilityName}
              passengerCountForAdult={
                data.ticketDetails.priceDetails.basePriceBreakdown.adult
                  .passengerCount
              }
              passengerCountForChild={
                data.ticketDetails.priceDetails.basePriceBreakdown.child
                  .passengerCount
              }
              passengerCountForInfant={
                data.ticketDetails.priceDetails.basePriceBreakdown.infant
                  .passengerCount
              }
              departureTime={data.departureDateTime}
              arrivalTime={data.arrivalDateTime}
              departureAirportCode={data.departureAirportCode}
              arrivalAirportCode={data.arrivalAirportCode}
              iconFlight={`${API_URL}${data.airline.iconUrl}`}
              durationInMin={getDurationInHour(data.durationInMin)}
              luggage={data.luggage}
              basePricePerPerson={data.basePricePerPerson}
              discountedPricePerPerson={data.discountedPricePerPerson}
              totalDicount={data.ticketDetails.priceDetails.totalDicount}
              totalPrice={data.ticketDetails.priceDetails.total}
              classId={resultSearch.classId}
              ticketId={data.ticketId}
            />
          );
        })}
        <div className="flex justify-center gap-3">
          <button
            onClick={handlePrevPage}
            disabled={
              getNumberPagination.num === 1 ||
              getLoading.isLoading ||
              getNumberPagination.num === 0
            }
            className={`bg-primary-normal text-white text-center rounded py-1 px-2 ${
              getNumberPagination.num === 1 ||
              getLoading.isLoading ||
              getNumberPagination.num === 0
                ? "cursor-not-allowed opacity-80"
                : ""
            }`}
          >
            Kembali
          </button>
          <p className="bg-primary-normal text-white py-1 px-2 text-center rounded">
            {getNumberPagination.num === 0 ? 1 : getNumberPagination.num}
          </p>
          <p>/</p>
          <p className="bg-primary-normal text-white py-1 px-2 text-center rounded">
            {lastPage === 0 ? lastPage + 1 : lastPage}
          </p>
          <button
            onClick={handleNextPage}
            disabled={
              getNumberPagination.num >= lastPage ||
              getLoading.isLoading ||
              lastPage === 1
            }
            className={`bg-primary-normal text-white text-center rounded py-1 px-2 ${
              getNumberPagination.num >= lastPage ||
              getLoading.isLoading ||
              lastPage === 1
                ? "cursor-not-allowed opacity-80"
                : ""
            }`}
          >
            Lanjut
          </button>
        </div>
      </div>
    </>
  );
}

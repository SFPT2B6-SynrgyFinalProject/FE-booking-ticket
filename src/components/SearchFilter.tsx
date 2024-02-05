import { Icon } from "@iconify/react/dist/iconify.js";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../config/redux/store";
import { useState } from "react";
import { SearchByUser, getFlightTicket } from "../lib/services/flightTicket";
import {
  setDataBySearch,
  setIsLoading,
  setNumberPagination,
} from "../config/redux/action";

interface SelectedAirlineType {
  [key: string]: number;
  Garuda: number;
  Citilink: number;
  Lion: number;
  SuperAirJet: number;
  Batik: number;
}

interface SelectedTimeType {
  [key: string]: boolean;
  "00:00 - 06:00": boolean;
  "06:00 - 12:00": boolean;
  "12:00 - 18:00": boolean;
  "18:00 - 24:00": boolean;
}

interface SortByType {
  [key: string]: string;
  Price: string;
  Duration: string;
}

export default function SearchFilter() {
  const [selectedAirline, setSelectedAirline] = useState<SelectedAirlineType>({
    Garuda: 0,
    Citilink: 0,
    Lion: 0,
    SuperAirJet: 0,
    Batik: 0,
  });
  const [selectedDepartureTime, setSelectedDepartureTime] =
    useState<SelectedTimeType>({
      "00:00 - 06:00": false,
      "06:00 - 12:00": false,
      "12:00 - 18:00": false,
      "18:00 - 24:00": false,
    });
  const [selectedArrivalTime, setSelectedArrivalTime] =
    useState<SelectedTimeType>({
      "00:00 - 06:00": false,
      "06:00 - 12:00": false,
      "12:00 - 18:00": false,
      "18:00 - 24:00": false,
    });

  const [selectedSortBy, setSelectedSortBy] = useState<SortByType>({
    Price: "",
    Duration: "",
  });

  const resultSearch = useSelector(
    (state: RootState) => state.resultSearchReducer
  );

  const dispatch = useDispatch<AppDispatch>();

  const handleFilteredData = async (
    updateAirline: SelectedAirlineType,
    updateDepartureTime: SelectedTimeType,
    updateArrivalTime: SelectedTimeType,
    updateSortBy: SortByType
  ) => {
    dispatch(setIsLoading(true));
    try {
      const getAirlineId = Object.keys(updateAirline)
        .filter((airline) => updateAirline[airline] !== 0)
        .map((airline) => updateAirline[airline]);
      const getTimeDepartureStart = new Date(resultSearch.departureDateStart);
      const getTimeDepartureEnd = new Date(resultSearch.departureDateEnd);
      const getTimeArrivalStart = new Date(resultSearch.departureDateStart);
      const getTimeArrivalEnd = new Date(resultSearch.departureDateEnd);

      if (updateDepartureTime["00:00 - 06:00"]) {
        getTimeDepartureStart.setUTCHours(0);
        getTimeDepartureEnd.setUTCHours(6);
        getTimeDepartureEnd.setMinutes(0);
      } else if (updateDepartureTime["06:00 - 12:00"]) {
        getTimeDepartureStart.setUTCHours(6);
        getTimeDepartureEnd.setUTCHours(12);
        getTimeDepartureEnd.setMinutes(0);
      } else if (updateDepartureTime["12:00 - 18:00"]) {
        getTimeDepartureStart.setUTCHours(12);
        getTimeDepartureEnd.setUTCHours(18);
        getTimeDepartureEnd.setMinutes(0);
      } else if (updateDepartureTime["18:00 - 24:00"]) {
        getTimeDepartureStart.setUTCHours(18);
        getTimeDepartureEnd.setUTCHours(24);
        getTimeDepartureEnd.setMinutes(0);
      }

      if (updateArrivalTime["00:00 - 06:00"]) {
        getTimeArrivalStart.setUTCHours(0);
        getTimeArrivalEnd.setUTCHours(6);
        getTimeArrivalEnd.setMinutes(0);
      } else if (updateArrivalTime["06:00 - 12:00"]) {
        getTimeArrivalStart.setUTCHours(6);
        getTimeArrivalEnd.setUTCHours(12);
        getTimeArrivalEnd.setMinutes(0);
      } else if (updateArrivalTime["12:00 - 18:00"]) {
        getTimeArrivalStart.setUTCHours(12);
        getTimeArrivalEnd.setUTCHours(18);
        getTimeArrivalEnd.setMinutes(0);
      } else if (updateArrivalTime["18:00 - 24:00"]) {
        getTimeArrivalStart.setUTCHours(18);
        getTimeArrivalEnd.setUTCHours(24);
        getTimeArrivalEnd.setMinutes(0);
      }

      const sortBy: string[] = [];
      if (updateSortBy.Price === "price") {
        sortBy.push("price");
      }

      if (updateSortBy.Duration === "duration") {
        sortBy.push("duration");
      }

      console.log(sortBy);

      const payload: SearchByUser = {
        ...resultSearch,
        departureDateStart: getTimeDepartureStart.toISOString(),
        departureDateEnd: getTimeDepartureEnd.toISOString(),
        arrivalDateStart: getTimeArrivalStart.toISOString(),
        arrivalDateEnd: getTimeArrivalEnd.toISOString(),
        airlineId: getAirlineId,
        sortBy,
      };

      const result = await getFlightTicket(payload);
      dispatch(setDataBySearch(result));
      dispatch(setNumberPagination(1));
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  const handleCheckAirline = (airline: string, value: number) => {
    setSelectedAirline((prev) => {
      const updateAirline = {
        ...prev,
        [airline]: prev[airline] === value ? 0 : value,
      };
      if (resultSearch.classId !== 0) {
        handleFilteredData(
          updateAirline,
          selectedDepartureTime,
          selectedArrivalTime,
          selectedSortBy
        );
        return updateAirline;
      } else {
        return updateAirline;
      }
    });
  };

  const handleSortByChange = (sortByOption: string, value: string) => {
    setSelectedSortBy((prev) => {
      const updateSortBy = {
        ...prev,
        [sortByOption]: prev[sortByOption] === value ? "" : value,
      };

      if (resultSearch.classId !== 0) {
        handleFilteredData(
          selectedAirline,
          selectedDepartureTime,
          selectedArrivalTime,
          updateSortBy
        );
        return updateSortBy;
      } else {
        return updateSortBy;
      }
    });
  };

  const handleDepartureTime = (departure: string) => {
    setSelectedDepartureTime((prev) => {
      const updateDepartureTime = {
        ...prev,
        [departure]: !prev[departure],
      };
      if (resultSearch.classId !== 0) {
        handleFilteredData(
          selectedAirline,
          updateDepartureTime,
          selectedArrivalTime,
          selectedSortBy
        );
        return updateDepartureTime;
      } else {
        return updateDepartureTime;
      }
    });
  };

  const handleArrivalTime = (arrival: string) => {
    setSelectedArrivalTime((prev) => {
      const updateArrivalTime = {
        ...prev,
        [arrival]: !prev[arrival],
      };
      if (resultSearch.classId !== 0) {
        handleFilteredData(
          selectedAirline,
          selectedDepartureTime,
          updateArrivalTime,
          selectedSortBy
        );
        return updateArrivalTime;
      } else {
        return updateArrivalTime;
      }
    });
  };

  return (
    <>
      <div className="search-filter-container lg:col-span-1 bg-white py-[45px] px-[51px] rounded-[30px] h-fit">
        <header className="flex justify-between">
          <div className="flex gap-4">
            <Icon
              icon="mingcute:filter-line"
              className="w-[24px] h-[24px] text-neutral-800"
            />
            <h3 className="text-xl font-sans text-neutral-800 font-semibold">
              Filter
            </h3>
          </div>
          <button className="font-sans text-neutral-800 font-semibold">
            Reset
          </button>
        </header>
        <div>
          <h4 className="font-sans text-neutral-800 font-semibold mt-5">
            Maskapai
          </h4>
          <div className="flex flex-col gap-[18px] p-[10px] pl-[23px]">
            <div className="flex justify-between">
              <p className="font-sans text-neutral-800">Garuda Indonesia</p>
              <input
                type="checkbox"
                className="w-5 h-5"
                name="one-airline"
                checked={selectedAirline.Garuda === 1}
                onChange={() => handleCheckAirline("Garuda", 1)}
              />
            </div>
            <div className="flex justify-between">
              <p className="font-sans text-neutral-800">Citilink</p>
              <input
                type="checkbox"
                className="w-5 h-5"
                name="two-airline"
                checked={selectedAirline.Citilink === 2}
                onChange={() => handleCheckAirline("Citilink", 2)}
              />
            </div>
            <div className="flex justify-between">
              <p className="font-sans text-neutral-800">Lion Air</p>
              <input
                type="checkbox"
                className="w-5 h-5"
                name="three-airline"
                checked={selectedAirline.Lion === 3}
                onChange={() => handleCheckAirline("Lion", 3)}
              />
            </div>
            <div className="flex justify-between">
              <p className="font-sans text-neutral-800">Super Air Jet</p>
              <input
                type="checkbox"
                className="w-5 h-5"
                name="four-airline"
                checked={selectedAirline.SuperAirJet === 4}
                onChange={() => handleCheckAirline("SuperAirJet", 4)}
              />
            </div>
            <div className="flex justify-between">
              <p className="font-sans text-neutral-800">Batik Air</p>
              <input
                type="checkbox"
                className="w-5 h-5"
                name="five-airline"
                checked={selectedAirline.Batik === 5}
                onChange={() => handleCheckAirline("Batik", 5)}
              />
            </div>
          </div>
          <h4 className="font-sans text-neutral-800 font-semibold mt-5">
            Waktu Berangkat
          </h4>
          <div className="flex flex-col gap-[18px] p-[10px] pl-[23px]">
            {Object.keys(selectedDepartureTime).map((time, index) => (
              <div className="flex justify-between" key={index}>
                <p className="font-sans text-neutral-800">{time}</p>
                <input
                  type="checkbox"
                  className="w-5 h-5"
                  checked={selectedDepartureTime[time]}
                  onChange={() => handleDepartureTime(time)}
                />
              </div>
            ))}
          </div>
          <h4 className="font-sans text-neutral-800 font-semibold mt-5">
            Waktu Tiba
          </h4>
          <div className="flex flex-col gap-[18px] p-[10px] pl-[23px]">
            {Object.keys(selectedArrivalTime).map((time, index) => (
              <div className="flex justify-between" key={index}>
                <p className="font-sans text-neutral-800">{time}</p>
                <input
                  type="checkbox"
                  className="w-5 h-5"
                  checked={selectedArrivalTime[time]}
                  onChange={() => handleArrivalTime(time)}
                />
              </div>
            ))}
          </div>
          <h4 className="font-sans text-neutral-800 font-semibold mt-5">
            Urutkan Berdasarkan
          </h4>
          <div className="flex flex-col gap-[18px] p-[10px] pl-[23px]">
            <div className="flex justify-between">
              <p className="font-sans text-neutral-800">Harga Terendah</p>
              <input
                type="checkbox"
                className="w-5 h-5"
                checked={selectedSortBy.Price === "price"}
                onChange={() => handleSortByChange("Price", "price")}
              />
            </div>
            <div className="flex justify-between">
              <p className="font-sans text-neutral-800">Durasi Terpendek</p>
              <input
                type="checkbox"
                className="w-5 h-5"
                checked={selectedSortBy.Duration === "duration"}
                onChange={() => handleSortByChange("Duration", "duration")}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

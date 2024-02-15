import React, { useState, FormEvent, useEffect } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import Select, {
  ActionMeta,
  components,
  ControlProps,
  GroupBase,
  MultiValue,
  SingleValue,
} from "react-select";
import HeaderSearchItem from "../components/addPerson";
import { AppDispatch, RootState } from "../config/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { SearchByUser, getFlightTicket } from "../lib/services/flightTicket";
import {
  setAirport,
  setDataBySearch,
  setFlightClass,
  setIsLoading,
  setNumberPagination,
  setResultSearch,
} from "../config/redux/action";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { getFlightClass } from "../lib/services/flightClass";
import { getAirport } from "../lib/services/airport";
import { IAlert } from "../lib/services/auth";
import Alert from "./Alert";

interface Option {
  value: number | string;
  label: string;
}

interface OptionPersonAgeType {
  bayi: number;
  anak: number;
  dewasa: number;
}

const CustomControl: React.FC<
  ControlProps<Option, boolean, GroupBase<Option>>
> = ({ children, ...props }) => (
  <components.Control {...props}>
    <Icon
      icon="mingcute:flight-takeoff-line"
      width={24}
      className="mr-2 text-gray-500"
    />
    {children}
  </components.Control>
);
const CustomControl1: React.FC<
  ControlProps<Option, boolean, GroupBase<Option>>
> = ({ children, ...props }) => (
  <components.Control {...props}>
    <Icon
      icon="mingcute:flight-land-line"
      width={24}
      className="mr-2 text-gray-500"
    />
    {children}
  </components.Control>
);

const CustomControl2: React.FC<
  ControlProps<Option, boolean, GroupBase<Option>>
> = ({ children, ...props }) => (
  <components.Control {...props}>
    <Icon
      icon="ph:office-chair-bold"
      width={24}
      className="ml-[.7rem] mr-1 text-gray-600/80"
    />
    {children}
  </components.Control>
);

const SearchBox: React.FC = () => {
  // const [isFocused, setIsFocused] = useState(false);
  const [selectedFlightClass, setSelectedFlightClass] = useState<
    number | string
  >(0);
  const [selectedDeparture, setSelectedDeparture] = useState<number | string>(
    ""
  );
  const [selectedArrival, setSelectedArrival] = useState<number | string>("");
  const [selectedDepartureDate, setSelectedDepartureDate] =
    useState<string>("");
  const [selectedArrivalDate, setSelectedArrivalDate] = useState<string>("");
  const optionFlightClass = useSelector(
    (state: RootState) => state.flightClassReducer
  );
  const [isLoadings, setIsLoadings] = useState<boolean>(false);
  const optionAirport = useSelector((state: RootState) => state.airportReducer);
  const [optionPersonAge, setOptionPersonAge] = useState<OptionPersonAgeType>({
    bayi: 0,
    anak: 0,
    dewasa: 1,
  });
  const dispatch = useDispatch<AppDispatch>();
  const navigate: NavigateFunction = useNavigate();
  const [alert, setAlert] = useState<IAlert | null>(null);

  const handleOptionPersonAge = (
    type: keyof OptionPersonAgeType,
    action: "i" | "d"
  ) => {
    setOptionPersonAge((prevOptions) => ({
      ...prevOptions,
      [type]:
        action === "i"
          ? prevOptions[type] + 1
          : Math.max(prevOptions[type] - 1, 1),
    }));
  };

  const handleSelectChange = (
    selected: SingleValue<Option> | MultiValue<Option>,
    actionMeta: ActionMeta<Option>
  ) => {
    const selectedValue = (selected as Option)?.value;
    switch (actionMeta.name) {
      case "departure":
        setSelectedDeparture(selectedValue);
        break;
      case "arrival":
        setSelectedArrival(selectedValue);
        break;
      case "flight-class":
        setSelectedFlightClass(selectedValue);
        break;
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "departure-date-start") {
      setSelectedDepartureDate(value);
    } else if (name === "departure-date-end") {
      setSelectedArrivalDate(value);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    setIsLoadings(true);
    setAlert({
      type: "process",
      data: {},
      message: "Proses pencarian tiket",
    });
    dispatch(setIsLoading(true));
    e.preventDefault();
    try {
      const payload: SearchByUser = {
        classId: selectedFlightClass,
        passenger: {
          adult: optionPersonAge.dewasa,
          infant: optionPersonAge.bayi,
          child: optionPersonAge.anak,
        },
        arrivalCode: selectedArrival,
        departureCode: selectedDeparture,
        departureDateStart: selectedDepartureDate + "T00:00:00.000Z",
        departureDateEnd: selectedArrivalDate + "T23:59:00.000Z",
        airlineId: [],
        sortBy: [],
        page: 0,
        dataPerPage: 4,
      };
      const result = await getFlightTicket(payload);
      dispatch(setResultSearch(payload));
      dispatch(setDataBySearch(result));
      dispatch(setNumberPagination(1));
      navigate("/search");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadings(false);
      dispatch(setIsLoading(false));
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const getFlightClasses = await getFlightClass();
        dispatch(setFlightClass(getFlightClasses));
        const getAirports = await getAirport();
        dispatch(setAirport(getAirports));
      } catch (error) {
        console.error("Error fetching flight classes:", error);
      }
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    const dtToday = new Date();
    const month = (dtToday.getMonth() + 1).toString().padStart(2, '0');
    const day = dtToday.getDate().toString().padStart(2, '0');
    const year = dtToday.getFullYear();
    const maxDate = `${year}-${month}-${day}`;

    const inputDateStart = document.getElementById('departure-date-start') as HTMLInputElement;
    const inputDateEnd = document.getElementById('departure-date-end') as HTMLInputElement;

    if (inputDateStart) {
      inputDateStart.min = maxDate;
    }

    if (inputDateEnd) {
      inputDateEnd.min = maxDate;
    }
  }, []);

  return (
    <>
      <div className="container relative select-none">
        {isLoadings ? (
          <>
            {alert && (
              <div>
                {alert.type === "process" && (
                  <Alert message={alert.message} type="process" />
                )}
              </div>
            )}
          </>
        ) : null}
        <form
          className="searchbox-container bg-white font-outfit rounded-[30px] py-6 md:py-7 lg:pt-[27px] lg:pb-[33px] px-[22px]"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col justify-end search-controller md:flex-row">
            <button
              id="btnSearchTicket"
              type="submit"
              className={`text-white bg-blue-600 max-sm:hidden lg:py-2 px-4 rounded-[10px] mt-4 md:mt-0 hidden lg:flex items-center gap-[10px] ${
                !selectedDeparture ||
                !selectedArrival ||
                !selectedDepartureDate ||
                !selectedArrivalDate ||
                !selectedFlightClass ||
                !optionPersonAge.dewasa
                  ? "!bg-[#d3d3d3] text-white cursor-not-allowed"
                  : ""
              }`}
              disabled={
                !selectedDeparture ||
                !selectedArrival ||
                !selectedDepartureDate ||
                !selectedArrivalDate ||
                !selectedFlightClass ||
                !optionPersonAge.dewasa
              }
            >
              {isLoadings ? "Tunggu ..." : "Cari tiket"}
              <Icon icon="mdi:magnify" className="w-6 h-6 text-white" />
            </button>
          </div>
          <div className="grid grid-cols-1 gap-6 mt-0 search-items lg:grid-cols-11 md:grid-cols-2 lg:gap-x-5 lg:gap-y-6 md:gap-6 lg:mt-6">
            <div className="form-group lg:col-span-4">
              <Select
                placeholder="Pilih bandara"
                components={{ Control: CustomControl }}
                classNames={{
                  control: () =>
                    "!bg-white !border !border-gray-400 !text-gray-900 !text-md !rounded-[10px] !focus:ring-blue-500 !focus:border-blue-500 !w-full px-[18px] h-[55px]",
                }}
                options={optionAirport.data.map((airport) => ({
                  value: airport.code,
                  label: `${airport.cityName} (${airport.code})`,
                }))}
                onChange={handleSelectChange}
                name="departure"
              />
            </div>
            <div className="form-group lg:col-span-4">
              <Select
                placeholder="Mau ke mana?"
                components={{ Control: CustomControl1 }}
                classNames={{
                  control: () =>
                    "!bg-white !border !border-gray-400 !text-gray-900 !text-md !rounded-[10px] !focus:ring-blue-500 !focus:border-blue-500 !w-full px-[18px] h-[55px]",
                }}
                // defaultValue={selectedOption2}
                options={optionAirport.data.map((airport) => ({
                  value: airport.code,
                  label: `${airport.cityName} (${airport.code})`,
                }))}
                onChange={handleSelectChange}
                name="arrival"
              />
            </div>
            <div className="form-group lg:col-span-3">
              <HeaderSearchItem
                optionPersonAgeUser={optionPersonAge}
                handleOptionPersonUser={handleOptionPersonAge}
              />
            </div>
            <div className="form-group lg:col-span-4">
              <div className="relative">
                {/* {!isFocused && ( */}
                <Icon
                  icon="uil:calendar-alt"
                  width={23}
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "20px",
                    transform: "translateY(-50%)",
                  }}
                  className="text-gray-500"
                />
                {/* )} */}
                <input
                  placeholder="Keberangkatan awal"
                  className="bg-white border border-gray-400 text-gray-800 text-[1rem] focus:ring-blue-500 focus:border-blue-500 focus:outline-none focus:border-2 block w-full p-2.5 !h-[55px] pl-[3.7rem] rounded-[10px] placeholder-gray-500/90"
                  type="text"
                  onFocus={(e) => (
                    (e.target.type = "date"),
                    (e.target.name = "departure-date-start")
                  )}
                  onBlur={(e) => (
                    (e.target.type = "text"),
                    (e.target.name = "departure-date-start")
                  )}
                  id="departure-date-start"
                  name="departure-date-start"
                  onChange={handleDateChange}
                />
              </div>
            </div>
            <div className="form-group lg:col-span-4">
              <div className="relative">
                {/* {!isFocused && ( */}
                <Icon
                  icon="uil:calendar-alt"
                  width={23}
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "20px",
                    transform: "translateY(-50%)",
                  }}
                  className="text-gray-500"
                />
                {/* )} */}
                <input
                  placeholder="Keberangkatan akhir"
                  className="bg-white border border-gray-400 text-gray-800 text-[1rem] focus:ring-blue-500 focus:border-blue-500 focus:outline-none focus:border-2 block w-full p-2.5 !h-[55px] pl-[3.7rem] rounded-[10px] placeholder-gray-500/90"
                  type="text"
                  onFocus={(e) => (
                    (e.target.type = "date"),
                    (e.target.name = "departure-date-end")
                  )}
                  onBlur={(e) => (
                    (e.target.type = "text"),
                    (e.target.name = "departure-date-end")
                  )}
                  id="departure-date-end"
                  name="departure-date-end"
                  onChange={handleDateChange}
                />
              </div>
            </div>
            <div className="form-group lg:col-span-3">
              <Select
                components={{ Control: CustomControl2 }}
                classNames={{
                  control: () =>
                    "!bg-white !border !border-gray-400 !text-gray-900 !text-md !focus:ring-blue-500 !focus:border-blue-500 !w-full px-2.5 !h-[55px] !rounded-[10px]",
                }}
                placeholder="Kelas"
                options={optionFlightClass.data.map((flightClass) => ({
                  value: flightClass.id,
                  label: flightClass.name,
                }))}
                onChange={handleSelectChange}
                name="flight-class"
              />
            </div>
          </div>
          <div className="mt-10 form-group lg:hidden">
            <button
              id="btnSearchTicket"
              type="submit"
              className={`text-white bg-primary-normal w-full py-3 px-3 rounded-[10px] mt-4 md:mt-0 flex items-center justify-center gap-[10px] ${
                !selectedDeparture ||
                !selectedArrival ||
                !selectedDepartureDate ||
                !selectedArrivalDate ||
                !selectedFlightClass ||
                !optionPersonAge.dewasa
                  ? "!bg-[#d3d3d3] text-white cursor-not-allowed"
                  : ""
              }`}
              disabled={
                !selectedDeparture ||
                !selectedArrival ||
                !selectedDepartureDate ||
                !selectedArrivalDate ||
                !selectedFlightClass ||
                !optionPersonAge.dewasa
              }
            >
              {isLoadings ? "Tunggu ..." : "Search"}
              <Icon icon="mdi:magnify" className="w-6 h-6 text-white" />
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SearchBox;

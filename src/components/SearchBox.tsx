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
    <Icon icon="mingcute:flight-takeoff-line" width={24} className="mr-2 text-gray-500" />
    {children}
  </components.Control>
);
const CustomControl1: React.FC<
  ControlProps<Option, boolean, GroupBase<Option>>
> = ({ children, ...props }) => (
  <components.Control {...props}>
    <Icon icon="mingcute:flight-land-line" width={24} className="mr-2 text-gray-500" />
    {children}
  </components.Control>
);

const CustomControl2: React.FC<
  ControlProps<Option, boolean, GroupBase<Option>>
> = ({ children, ...props }) => (
  <components.Control {...props}>
    <Icon icon="ph:office-chair-bold" width={24} className="ml-[.7rem] mr-1 text-gray-600/80" />
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
    dewasa: 0,
  });
  const dispatch = useDispatch<AppDispatch>();
  const navigate: NavigateFunction = useNavigate();

  const handleOptionPersonAge = (
    type: keyof OptionPersonAgeType,
    action: "i" | "d"
  ) => {
    setOptionPersonAge((prevOptions) => ({
      ...prevOptions,
      [type]:
        action === "i"
          ? prevOptions[type] + 1
          : Math.max(prevOptions[type] - 1, 0),
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

  return (
    <>
      <div className="container relative select-none">
        {isLoadings ? (
          <>
            <section className="absolute rounded-[30px] z-[1] bg-black w-[27.9rem] lg:w-full h-full opacity-10"></section>
            <div
              role="status"
              className="absolute z-[2] text-white mt-56 lg:mt-28 text-center left-[47%]"
            >
              <div className="animate-spin rounded-full w-10 h-10 bg-gradient-to-tr from-blue-600 to-blue-300">
                <div className="h-6 w-6 rounded-full bg-gray-100"></div>
              </div>
            </div>
          </>
        ) : null}
        <form
          className="searchbox-container bg-white font-outfit rounded-[30px] pt-2 lg:pt-[27px] pb-[33px] px-[22px]"
          onSubmit={handleSubmit}
        >
          <div className="search-controller flex flex-col md:flex-row justify-end">
            <button
              type="submit"
              className={`text-white bg-primary-normal max-sm:hidden lg:py-2 px-4 rounded-[10px] mt-4 md:mt-0 flex items-center gap-[10px] ${
                !selectedDeparture ||
                !selectedArrival ||
                !selectedDepartureDate ||
                !selectedArrivalDate ||
                !selectedFlightClass ||
                !optionPersonAge.dewasa
                  ? "cursor-not-allowed opacity-75"
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
              <Icon icon="mdi:magnify" className="text-white w-6 h-6" />
            </button>
          </div>
          <div className="search-items grid grid-cols-1 md:grid-cols-11 gap-x-4 md:gap-x-14 gap-y-[13px] mt-6">
            <div className="form-group lg:col-span-4">
              <Select
                placeholder="Pilih kota atau bandara"
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
                  placeholder="Tanggal keberangkatan"
                  className="bg-white border border-gray-400 text-gray-800 text-[1rem] focus:ring-blue-500 focus:border-blue-500 focus:outline-none focus:border-2 block w-full p-2.5 !h-[55px] pl-[3.7rem] rounded-[10px] placeholder-gray-500/90"
                  type="text"
                  onFocus={(e) => (
                    (e.target.type = "date"), (e.target.name = "departure-date-start")
                  )}
                  onBlur={(e) => (
                    (e.target.type = "text"), (e.target.name = "departure-date-start")
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
                  placeholder="Tanggal kedatangan"
                  className="bg-white border border-gray-400 text-gray-800 text-[1rem] focus:ring-blue-500 focus:border-blue-500 focus:outline-none focus:border-2 block w-full p-2.5 !h-[55px] pl-[3.7rem] rounded-[10px] placeholder-gray-500/90"
                  type="text"
                  onFocus={(e) => (
                    (e.target.type = "date"), (e.target.name = "departure-date-end")
                  )}
                  onBlur={(e) => (
                    (e.target.type = "text"), (e.target.name = "departure-date-end")
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
            <div className="form-group lg:hidden">
              <button
                type="submit"
                className="text-white bg-primary-normal w-full py-3 px-3 rounded-[10px] mt-4 md:mt-0 flex items-center justify-center gap-[10px]"
              >
                Search
                <Icon icon="mdi:magnify" className="text-white w-6 h-6" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default SearchBox;

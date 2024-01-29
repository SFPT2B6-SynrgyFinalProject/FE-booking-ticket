import React, { useState, FormEvent } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import Select, { components, ControlProps, GroupBase } from "react-select";
import HeaderSearchItem from "../components/addPerson";

interface Option {
  value: string;
  label: string;
}

const CustomControl: React.FC<ControlProps<Option, boolean, GroupBase<Option>>> = ({
  children,
  ...props
}) => (
  <components.Control {...props}>
    <Icon icon="mingcute:flight-takeoff-line" width={24} className="mr-2" />
    {children}
  </components.Control>
);
const CustomControl1: React.FC<ControlProps<Option, boolean, GroupBase<Option>>> = ({
  children,
  ...props
}) => (
  <components.Control {...props}>
    <Icon icon="mingcute:flight-land-line" width={24} className="mr-2" />
    {children}
  </components.Control>
);

const CustomControl2: React.FC<ControlProps<Option, boolean, GroupBase<Option>>> = ({
  children,
  ...props
}) => (
  <components.Control {...props}>
    <Icon icon="solar:chair-2-bold" width={24} className="mr-2" />
    {children}
  </components.Control>
);

const options = [
  { value: "jakarta", label: "jakarta" },
  { value: "Bali", label: "Bali" },
  { value: "Jogjakarta", label: "Jogjakarta" },
];
const options2 = [
  { value: "ekonomi", label: "ekonomi" },
  { value: "bussines", label: "bussines" },
  { value: "executive", label: "executive" },
];

interface SearchBoxProps {}

const SearchBox: React.FC<SearchBoxProps> = () => {
  const [selectedOption2] = useState(null);
  const navigate: NavigateFunction = useNavigate();
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault(); // Prevents the default form submission behavior
    // Your form submission logic goes here

    navigate("/search");
  };

  return (
    <>
      <section className="">
        <div className="container">
          <form
            className="searchbox-container bg-white font-outfit rounded-[30px] py-[27px] px-[22px]"
            onSubmit={handleSubmit}
          >
            <div className="search-controller flex flex-col md:flex-row justify-end">
              <button
                type="submit"
                className="text-white bg-primary-normal max-sm:hidden lg:py-2 px-4 rounded-[10px] mt-4 md:mt-0 flex items-center gap-[10px]"
              >
                Search
                <Icon icon="mdi:magnify" className="text-white w-6 h-6" />
              </button>
            </div>
            <div className="search-items grid grid-cols-1 md:grid-cols-11 gap-x-4 md:gap-x-14 gap-y-[13px] mt-6">
              <div className="form-group lg:col-span-4">
                <Select
                  placeholder="from"
                  components={{ Control: CustomControl }}
                  classNames={{
                    control: () =>
                      "!bg-white !border !border-gray-400 !text-gray-900 !text-sm !rounded-[10px] !focus:ring-blue-500 !focus:border-blue-500 !w-full px-[18px] h-[55px]",
                  }}
                  defaultValue={selectedOption2}
                  options={options}
                />
              </div>
              <div className="form-group lg:col-span-4">
                <Select
                  placeholder="To"
                  components={{ Control: CustomControl1 }}
                  classNames={{
                    control: () =>
                      "!bg-white !border !border-gray-400 !text-gray-900 !text-sm !rounded-[10px] !focus:ring-blue-500 !focus:border-blue-500 !w-full px-[18px] h-[55px]",
                  }}
                  defaultValue={selectedOption2}
                  options={options}
                />
              </div>
              <div className="form-group lg:col-span-3">
                <HeaderSearchItem />
              </div>
              <div className="form-group lg:col-span-4">
                <div className="relative">
                  {!isFocused && (
                    <Icon
                      icon="fluent:calendar-20-filled"
                      width={24}
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "20px",
                        transform: "translateY(-50%)",
                      }}
                    />
                  )}
                  <input
                    placeholder="Departure Date"
                    className="bg-white border border-gray-400 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 !h-[55px] pl-14 rounded-[10px]" // Add pl-10 for left padding
                    type="text"
                    onFocus={(e) => ((e.target.type = "date"), setIsFocused(true))}
                    onBlur={(e) => ((e.target.type = "text"), setIsFocused(false))}
                    id="date"
                  />
                </div>
              </div>
              <div className="form-group lg:col-span-4">
                <div className="relative">
                  {!isFocused && (
                    <Icon
                      icon="fluent:calendar-20-filled"
                      width={24}
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "20px",
                        transform: "translateY(-50%)",
                      }}
                    />
                  )}
                  <input
                    placeholder="Departure Arrival"
                    className="bg-white border border-gray-400 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 !h-[55px] pl-14 !rounded-[10px]" // Add pl-10 for left padding
                    type="text"
                    onFocus={(e) => ((e.target.type = "date"), setIsFocused(true))}
                    onBlur={(e) => ((e.target.type = "text"), setIsFocused(false))}
                    id="date"
                  />
                </div>
              </div>
              <div className="form-group lg:col-span-3">
                <Select
                  components={{ Control: CustomControl2 }}
                  classNames={{
                    control: () =>
                      "!bg-white !border !border-gray-400 !text-gray-900 !text-sm !focus:ring-blue-500 !focus:border-blue-500 !w-full px-2.5 !h-[55px] !rounded-[10px]",
                  }}
                  placeholder="class"
                  defaultValue={selectedOption2}
                  options={options2}
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
      </section>
    </>
  );
};

export default SearchBox;

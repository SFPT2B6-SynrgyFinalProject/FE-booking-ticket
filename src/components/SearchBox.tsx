import React, { useState, FormEvent } from "react";
import InputComponent from "./Input";
import { Icon } from "@iconify/react/dist/iconify.js";
import gambar1 from "../assets/images/famous-borobudur-temple-mungkid-indonesia.png";
import gambar2 from "../assets/images/kelingking-beach-sunset-nusa-penida-island-bali-indonesia.png";
import gambar3 from "../assets/images/temple-gates-lempuyang-luhur-temple-bali-indonesia.png";
import Select, { components, ControlProps, GroupBase } from "react-select";
import HeaderSearchItem from "../components/addPerson";

interface Option {
  value: string;
  label: string;
}

const CustomControl: React.FC<
  ControlProps<Option, boolean, GroupBase<Option>>
> = ({ children, ...props }) => (
  <components.Control {...props}>
    <Icon icon="clarity:plane-solid" width={24} className="mr-2" />
    {children}
  </components.Control>
);
const CustomControl1: React.FC<
  ControlProps<Option, boolean, GroupBase<Option>>
> = ({ children, ...props }) => (
  <components.Control {...props}>
    <Icon icon="bxs:plane-land" width={24} className="mr-2" />
    {children}
  </components.Control>
);

const CustomControl2: React.FC<
  ControlProps<Option, boolean, GroupBase<Option>>
> = ({ children, ...props }) => (
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
  const [isFocused, setIsFocused] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>("round-trip");

  const handleOptionChange = (option: string) => {
    setSelectedOption((prevOption) => (prevOption === option ? "" : option));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault(); // Prevents the default form submission behavior
    // Your form submission logic goes here
  };

  return (
    <>
      <section className="mt-36">
        <div className="container">
          <form
            className="searchbox-container font-outfit rounded-[30px] py-[27px] px-[22px]"
            onSubmit={handleSubmit}
          >
            <div className="search-controller flex flex-col md:flex-row justify-between">
              <div className="flex gap-8">
                <button
                  onClick={() => handleOptionChange("round-trip")}
                  className={`p-[10px] border rounded-tr-[1px] rounded-br-[15px] rounded-bl-[4px] rounded-tl-[15px] border-[#757575] text-neutral-900 ${
                    selectedOption === "round-trip"
                      ? "bg-primary-normal !text-white"
                      : ""
                  }`}
                >
                  Round Trip
                </button>
                <button
                  onClick={() => handleOptionChange("one-way")}
                  className={`p-[10px] border rounded-tr-[1px] rounded-br-[15px] rounded-bl-[4px] rounded-tl-[15px] border-[#757575] text-neutral-900 ${
                    selectedOption === "one-way"
                      ? "bg-primary-normal !text-white"
                      : ""
                  }`}
                >
                  One Way
                </button>
              </div>
              <button
                type="submit"
                className="text-white bg-primary-normal max-sm:hidden lg:py-2 px-3 rounded-[10px] mt-4 md:mt-0"
              >
                Search
              </button>
            </div>
            <div className="search-items grid grid-cols-1 md:grid-cols-11 gap-x-4 md:gap-x-14 gap-y-[13px] mt-6">
              <div className="form-group lg:col-span-4">
                <Select
                  placeholder="from"
                  components={{ Control: CustomControl }}
                  classNames={{
                    control: () =>
                      "!bg-white !border !border-gray-300 !text-gray-900 !text-sm !rounded !focus:ring-blue-500 !focus:border-blue-500 !w-full px-2.5 py-0.5",
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
                      "!bg-white !border !border-gray-300 !text-gray-900 !text-sm !rounded !focus:ring-blue-500 !focus:border-blue-500 !w-full px-2.5 py-0.5",
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
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "10px",
                        transform: "translateY(-50%)",
                        color: "#495057",
                      }}
                    />
                  )}
                  <input
                    placeholder="Departure Date"
                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pl-10" // Add pl-10 for left padding
                    type="text"
                    onFocus={(e) => (
                      (e.target.type = "date"), setIsFocused(true)
                    )}
                    onBlur={(e) => (
                      (e.target.type = "text"), setIsFocused(false)
                    )}
                    id="date"
                  />
                </div>
              </div>
              <div className="form-group lg:col-span-4">
                <div className="relative">
                  {!isFocused && (
                    <Icon
                      icon="fluent:calendar-20-filled"
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "10px",
                        transform: "translateY(-50%)",
                        color: "#495057",
                      }}
                    />
                  )}
                  <input
                    placeholder="Departure Arrival"
                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pl-10" // Add pl-10 for left padding
                    type="text"
                    onFocus={(e) => (
                      (e.target.type = "date"), setIsFocused(true)
                    )}
                    onBlur={(e) => (
                      (e.target.type = "text"), setIsFocused(false)
                    )}
                    id="date"
                  />
                </div>
              </div>
              <div className="form-group lg:col-span-3">
                <Select
                  components={{ Control: CustomControl2 }}
                  classNames={{
                    control: () =>
                      "!bg-white !border !border-gray-300 !text-gray-900 !text-sm !rounded !focus:ring-blue-500 !focus:border-blue-500 !w-full px-2.5 py-0.5",
                  }}
                  placeholder="class"
                  defaultValue={selectedOption2}
                  options={options2}
                />
              </div>
              <div className="form-group lg:hidden">
                <button
                  type="submit"
                  className="text-white bg-primary-normal w-full py-3 px-3 rounded-[10px] mt-4 md:mt-0"
                >
                  Search
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

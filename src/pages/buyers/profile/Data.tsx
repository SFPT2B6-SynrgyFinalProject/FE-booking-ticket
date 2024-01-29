import InputComponent from "../../../components/Input";
import { useState } from "react";
import Button from "../../../components/Button";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useSelector } from "react-redux";
import { RootState } from "../../../config/redux/store";

export default function Data() {
  // const [fullName, setFullName] = useState<string>("");
  //   const [gender, setGender]=useState<string>("")
  //   const [email, setEmail]=useState<string>("")
  //   const [tanggalLahir, setTanggalLahir]=useState<string>("")
  //   const [phone, setPhone]=useState<string>("")
  const [disabled, setDisabled] = useState<boolean>(true);
  const userData = useSelector((state: RootState) => state.userReducer);

  // const handleOnSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   const { value } = event.target;
  //   setGender(value);
  // };
  const off = () => {
    setDisabled(false);
  };
  const on = () => {
    setDisabled(true);
  };
  //   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //     const { name, value } = event.target;
  //     switch (name) {
  //       case "fullName":
  //         setFullName(value);
  //         break;
  //       case "tanggalLahir":
  //         setTanggalLahir(value);
  //         break;
  //       case "gender":
  //         setGender(value);
  //         break;
  //       case "email":
  //         setEmail(value);
  //         break;
  //       case "phone":
  //         setPhone(value);
  //         break;

  //   };
  // }

  return (
    <div>
      <div>
        <div className="flex mb-8 items-center">
          <h1 className="text-xl md:text-2xl font-bold text-black">Information Account</h1>
          {disabled ? (
            <Button
              type="secondary"
              color="secondary-normal"
              onClick={off}
              className="!py-0 text-base md:text-lg font-semibold"
            >
              <Icon icon={"typcn:edit"} /> Edit Profile
            </Button>
          ) : (
            ""
          )}
        </div>
        <h3 className="text-black font-bold text-lg md:text-xl mb-6">Data Pribadi</h3>
      </div>

      <div>
        <form>
          <>
            <div className="flex flex-col mb-7">
              <InputComponent
                type="text"
                id="fullName"
                name="fullName"
                value={userData.fullName ? userData.fullName : ""}
                // onChange={handleChange}
                customStyle={`py-[16px] pl-[20px] pr-[20px]`}
                placeholder="Full Name"
                disabled={disabled ? true : false}
              />
            </div>

            {/* Date of Birth Input */}
            <div className="flex flex-col mb-7">
              <InputComponent
                type="date"
                id="tanggalLahir"
                name="tanggalLahir"
                value={userData.birthDate === null ? "" : userData.birthDate.split("T")[0]}
                customStyle={`py-[16px] pl-[20px] pr-[20px]`}
                // onChange={handleChange}
                placeholder="Tanggal Lahir"
                disabled={disabled ? true : false}
              />
            </div>
            <div className="flex flex-col mb-7">
              <select
                name="gender"
                id="gender"
                disabled={disabled ? true : false}
                value={userData.gender ? userData.gender : ""}
                // onChange={handleOnSelect}
                className={`appearance-none bg-white border rounded-[10px] w-full py-[15px] pr-[20px] text-black border-black/60 focus:outline-none focus:shadow-outline pl-[20px] ${
                  disabled === true ? "!bg-gray-300/80 text-black cursor-not-allowed" : ""
                }`}
              >
                <option disabled={true} value="">
                  -- Choose Gender --
                </option>
                <option value="Laki-laki">Laki-laki</option>
                <option value="Perempuan">Perempuan</option>
              </select>
            </div>
            <div className="flex flex-col mb-7">
              <InputComponent
                type="email"
                id="email"
                name="email"
                value={userData.email ? userData.email : ""}
                customStyle={`py-[16px] pl-[20px] pr-[20px]`}
                // onChange={handleChange}
                placeholder="example@gmail.com"
                disabled={disabled ? true : false}
              />
            </div>
            <div className="flex flex-col mb-7">
              <InputComponent
                type="phone"
                id="phone"
                name="phone"
                value={userData.noHp ? userData.noHp : ""}
                customStyle={`py-[16px] pl-[20px] pr-[20px]`}
                // onChange={handleChange}
                placeholder="Nomor Telepon"
                disabled={disabled ? true : false}
              />
            </div>
            {disabled ? null : (
              <div className="flex justify-center sm:justify-end mt-8">
                <Button className="!px-9 bg-red-600 mr-3 sm:mr-5" onClick={on}>
                  Batal
                </Button>
                <Button className="!px-9">Kirim</Button>
              </div>
            )}
          </>
        </form>
      </div>
    </div>
  );
}

import InputComponent from "../../../../components/Input";
import Button from "../../../../components/Button";
import { Icon } from "@iconify/react/dist/iconify.js";
import useAction from "./data.hooks";

export default function ProfileData() {
  const { disabled, profileData, on, off, handleSubmit } = useAction();

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
        <form onSubmit={handleSubmit}>
          <>
            <div className="flex flex-col mb-7">
              <InputComponent
                type="text"
                id="fullName"
                name="fullName"
                value={profileData.fullName ? profileData.fullName : ""}
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
                value={profileData.birthDate === null ? "" : profileData.birthDate.split("T")[0]}
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
                value={profileData.gender ? profileData.gender : ""}
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
                value={profileData.email ? profileData.email : ""}
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
                value={profileData.noHp ? profileData.noHp : ""}
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

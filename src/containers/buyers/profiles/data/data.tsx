import InputComponent from "../../../../components/Input";
import Button from "../../../../components/Button";
import { Icon } from "@iconify/react/dist/iconify.js";
import useAction from "./data.hooks";
import Alert from "../../../../components/Alert";
import { FormModal } from "../../../../components/FormModal";

export default function ProfileData() {
  const {
    disabled,
    on,
    off,
    umurMin,
    open,
    verifikasi,
    handleSubmit,
    fullName,
    gender,
    handleChange,
    email,
    noHp,
    status,
    handleOnSelect,
    birthDate,
    isValidBirthdate,
  } = useAction();

  return (
    <div>
      {status !== "" ? (
        status === "Data gagal diubah" ? (
          <Alert type="fail" message={status} />
        ) : (
          <Alert type="success" message={status} />
        )
      ) : null}
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
                type="email"
                id="email"
                name="email"
                value={email ? email : ""}
                customStyle={`py-[16px] pl-[20px] pr-[20px]`}
                onChange={handleChange}
                placeholder="example@gmail.com"
                disabled={true}
              />
            </div>
            <div className="flex flex-col mb-7">
              <InputComponent
                type="text"
                id="fullName"
                name="fullName"
                value={fullName ? fullName : ""}
                onChange={handleChange}
                customStyle={`py-[16px] pl-[20px] pr-[20px]`}
                placeholder="Full Name"
                disabled={disabled ? true : false}
              />
            </div>

            {/* Date of Birth Input */}
            <div className="flex flex-col mb-7">
              <InputComponent
                type="date"
                id="birthDate"
                name="birthDate"
                value={birthDate === null ? "" : birthDate.split("T")[0]}
                customStyle={`py-[16px] pl-[20px] pr-[20px]`}
                onChange={handleChange}
                placeholder="Tanggal Lahir"
                disabled={disabled ? true : false}
              />

              {!isValidBirthdate && (
                <p className="text-red-500 text-sm font-medium pt-1">
                  *Minimal usia 17 tahun dari sekarang.
                </p>
              )}
            </div>
            <div className="flex flex-col mb-7">
              <select
                name="gender"
                id="gender"
                disabled={disabled ? true : false}
                value={gender ? gender : ""}
                onChange={handleOnSelect}
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
                type="phone"
                id="noHp"
                name="noHp"
                value={noHp ? noHp : ""}
                customStyle={`py-[16px] pl-[20px] pr-[20px]`}
                onChange={handleChange}
                placeholder="Nomor Telepon"
                disabled={disabled ? true : false}
              />
            </div>
         
          </>
        </form>
        {disabled ? null : (
              <div className="flex justify-center sm:justify-end mt-8">
                <Button className="!px-9 bg-rose-600 mr-3 sm:mr-5 hover:bg-rose-700" onClick={on}>
                  Batal
                </Button>
                <Button type="primary-dark" name="kirim" onClick={verifikasi} className="!px-9 rounded-2xl" color="primary-dark"  disabled={!umurMin||!fullName}>
                  Simpan
                </Button>
              </div>
            )}
         <FormModal title="Peringatan" isOpen={open}>
            <h2> Apakah anda yakin untuk mengubah data?</h2>
        <div className="flex justify-center sm:justify-end mt-8">
          <Button className="!px-9 bg-rose-600 mr-3 sm:mr-5 hover:bg-rose-700" onClick={on}>
            Batal
          </Button>
          <Button type="primary-dark" name="" onClick={handleSubmit} className="!px-9 rounded-2xl" color="primary-dark">
                yakin
          </Button>
        </div>
      </FormModal>
      </div>
    </div>
  );
}

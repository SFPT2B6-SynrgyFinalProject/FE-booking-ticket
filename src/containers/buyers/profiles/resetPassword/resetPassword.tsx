import InputComponent from "../../../../components/Input";
import Button from "../../../../components/Button";
import useAction from "./resetPassword.hooks";

const ProfileResetPassword = () => {
  const {
    currentPassword,
    newPassword,
    confirmpassword,
    showPassword,
    showPassword2,
    showConfirmPassword,
    togglePasswordVisibility,
    togglePasswordVisibility2,
    toggleConfirmPasswordVisibility,
    handleChange,
    handleSubmit,
  } = useAction();

  return (
    <div className="px-3">
      <h1 className="mb-8 text-xl md:text-2xl font-bold text-black ">Password</h1>
      <h3 className="text-black font-bold text-lg md:text-xl mb-6">Ubah Password</h3>

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col mb-7">
          <InputComponent
            type={showPassword2 ? "text" : "password"}
            id="currentPassword"
            name="currentPassword"
            value={currentPassword}
            placeholder="Password Lama"
            onChange={handleChange}
            customStyle={`py-[16px] pl-[20px] pr-[20px]`}
            icon={showPassword2 ? "mingcute:eye-line" : "mingcute:eye-close-line"}
            onIconClick={togglePasswordVisibility2}
            iconPosition="right"
          />
        </div>
        <div className="flex flex-col mb-7">
          <InputComponent
            type={showPassword ? "text" : "password"}
            id="newPassword"
            name="newPassword"
            value={newPassword}
            placeholder="Password Baru"
            onChange={handleChange}
            customStyle={`py-[16px] pl-[20px] pr-[20px]`}
            icon={showPassword ? "mingcute:eye-line" : "mingcute:eye-close-line"}
            onIconClick={togglePasswordVisibility}
            iconPosition="right"
          />
        </div>

        <div className="flex flex-col mb-7">
          <InputComponent
            type={showConfirmPassword ? "text" : "password"}
            id="confirmPassword"
            name="confirmPassword"
            value={confirmpassword}
            placeholder="Konfirmasi Password"
            onChange={handleChange}
            icon={showConfirmPassword ? "mingcute:eye-line" : "mingcute:eye-close-line"}
            onIconClick={toggleConfirmPasswordVisibility}
            iconPosition="right"
            customStyle={
              newPassword !== confirmpassword
                ? "border-red-500 py-[16px] pl-[20px] pr-[20px]"
                : "py-[16px] pl-[20px] pr-[20px]"
            }
          />
          {newPassword !== confirmpassword && <p className="text-red-500">Password tidak sama</p>}
        </div>

        <div className="flex justify-center sm:justify-end mt-8">
          <Button className="!px-9 bg-red-600 mr-3 sm:mr-5">Batal</Button>
          <Button className="!px-9">Kirim</Button>
        </div>
      </form>
    </div>
  );
};

export default ProfileResetPassword;

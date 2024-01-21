import React, {  useState } from 'react';
import InputComponent from '../../components/Input';
import Button from '../../components/Button';
const Reset = () => {
    const [newPassword, setNewPassword] = useState<string>("");
    const [lastPassword, setLastPassword] = useState<string>("");
    const [confirmpassword, setConfirmPassword] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
    const togglePasswordVisibility = () => {
      setShowPassword((prev) => !prev);
    };
  
    const toggleConfirmPasswordVisibility = () => {
      setShowConfirmPassword((prev) => !prev);
    };
  
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      switch (name) {
        case "confirmpassword":
          setConfirmPassword(value);
          break;
        case "newPassword":
          setNewPassword(value);
          break;
          case "lastPassword":
            setLastPassword(value);
            break;
      }
    };
  
  
  return (
    <div>
         <h1 className='font-bold text-xl mt-2 md:ml-8 mb-1 md:p-2'>Ubah Password</h1>
       <form  className="mt-10 md:pt-0 md:px-0 lg:px-12">
              <>
              <div className="flex flex-col mb-5">
                <label htmlFor="lastPassword">Password Lama</label>
                  <InputComponent
                    type={showPassword ? "text" : "password"}
                    id="lastPassword"
                    name="lastPassword"
                    value={lastPassword}
                    placeholder=""
                    onChange={handleChange}
                    icon={showPassword ? "mingcute:eye-line" : "mingcute:eye-close-line"}
                    onIconClick={togglePasswordVisibility}
                    iconPosition="right"
                  />
                </div>
                <div className="flex flex-col mb-5">
                <label htmlFor="newPassword">Password Baru</label>
                  <InputComponent
                    type={showPassword ? "text" : "password"}
                    id="newPassword"
                    name="newPassword"
                    value={newPassword}
                    placeholder="New Password"
                    onChange={handleChange}
                    icon={showPassword ? "mingcute:eye-line" : "mingcute:eye-close-line"}
                    onIconClick={togglePasswordVisibility}
                    iconPosition="right"
                  />
                </div>

                <div className="flex flex-col mb-5">
                <label htmlFor="newPassword">Konfirmasi Password</label>
                  <InputComponent
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmpassword"
                    name="confirmpassword"
                    value={confirmpassword}
                    placeholder="Confirm Password"
                    onChange={handleChange}
                    icon={showConfirmPassword ? "mingcute:eye-line" : "mingcute:eye-close-line"}
                    onIconClick={toggleConfirmPasswordVisibility}
                    iconPosition="right"
                    customStyle={newPassword !== confirmpassword ? "border-red-500" : ""}
                  />
                  {newPassword !== confirmpassword && (
                    <p className="text-red-500">Password tidak sama</p>
                  )}
                </div>

                <div className="flex mt-4  justify-end ">
                  <Button className="bg-rose-800 mr-5 sm:button-sm ">Batal</Button>
                  <Button >Kirim</Button>
    
                </div>
              </>
            </form>
    </div>
  );
};

export default Reset;

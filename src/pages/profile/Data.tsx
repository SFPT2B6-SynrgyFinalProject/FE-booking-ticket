
import InputComponent from "../../components/Input";
import { useState } from "react";
import Button from "../../components/Button";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useSelector } from "react-redux";
import { RootState } from "../../config/redux/store";
import Select,  { components, ControlProps, GroupBase } from 'react-select';
export default function Data() {
// const [fullName, setFullName] = useState<string>("");
//   const [gender, setGender]=useState<string>("")
//   const [email, setEmail]=useState<string>("")
//   const [tanggalLahir, setTanggalLahir]=useState<string>("")
//   const [phone, setPhone]=useState<string>("")
  const [disabled, setDisabled]=useState<boolean>(true)
  const userData = useSelector((state: RootState) => state.userReducer);
  const birthDateUser = new Date(userData.birthDate);
  // const handleOnSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   const { value } = event.target;
  //   setGender(value);
  // };
  const off=()=>{
    setDisabled(false)
  }
   const on=()=>{
    setDisabled(true)
  }
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
const options2 = [
  { value: 'Laki-Laki', label: 'Laki-Laki',  },
  { value: 'Perempuan', label: 'Perempuan' },

];

interface Option {
  value: string;
  label: string;
}
const [selectedOption] = useState(null);

const CustomControl2: React.FC<ControlProps<Option, boolean, GroupBase<Option>>> = ({ children, ...props }) => (
  <components.Control {...props}>   
      {children}
  </components.Control>
);
    return (
       <div className="w-[100%] h-[530px] md:p-10"> 
        <div className='head inline-flex flex  '>
        <h1 className=' text-2xl font-bold text-black'>Information Account</h1>
        {disabled?<Button type='secondary' color="secondary-normal" className="mb-5" onClick={off} ><Icon icon={"typcn:edit"}></Icon>Edit Profile</Button>:""}
        </div>
        <div className='body'>
          <form>
        <>
        <div  className="flex flex-col mb-1 mt-5">
          <InputComponent
            type="text"
            id="fullName"
            name="fullName"
            value={userData.fullName}
            // onChange={handleChange}
            customStyle={`py-[16px] pl-[20px] pr-[20px]`}
            placeholder="Full Name"
            disabled={disabled ? true : false}
          />
        </div>
  
        {/* Date of Birth Input */}
        <div  className="flex flex-col mb-1 mt-5">
          <InputComponent
            type="text"
            id="tanggalLahir"
            name="tanggalLahir"
            value={userData.birthDate === null ? "-" : birthDateUser.toLocaleDateString("id-ID")}
            customStyle={`py-[16px] pl-[20px] pr-[20px]`}
            // onChange={handleChange}
            placeholder=""
            disabled={disabled ? true : false}
          />
        </div>
        <div  className="flex flex-col mb-1 mt-5">
        <Select
        components={{ Control: CustomControl2 }}
        classNames={{
        control: () => " py-[10px] pl-[10px] pr-[10px] !bg-white border rounded-[10px] ",
        }}
        placeholder="geder"
        defaultValue={selectedOption}
        options={options2}
        isDisabled={disabled ? true : false}
           />

        </div>
        <div  className="flex flex-col mb-1 mt-5">
          <InputComponent
            type="email"
            id="email"
            name="email"
            value={userData.email}
            customStyle={`py-[16px] pl-[20px] pr-[20px]`}
            // onChange={handleChange}
            placeholder=""
            disabled={disabled ? true : false}
          />
        </div>
        <div  className="flex flex-col mb-1 mt-5">
          <InputComponent
            type="phone"
            id="phone"
            name="phone"
            value={userData.noHp ? userData.noHp : "-"}
            customStyle={`py-[16px] pl-[20px] pr-[20px]`}
            // onChange={handleChange}
            placeholder=""
            disabled={disabled ? true : false}
          />
        </div>
        {disabled ?null:(
        <div className="flex mt-4  justify-end mt-8 ">
          <Button className="bg-rose-800 mr-5 sm:button-sm " onClick={on}>Batal</Button>
          <Button >Kirim</Button>
        </div>
      ) }
    </>
      </form>
        </div>
        </div>
    )
}   

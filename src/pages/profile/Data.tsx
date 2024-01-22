
import InputComponent from "../../components/Input";
import { useState } from "react";
import Button from "../../components/Button";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useSelector } from "react-redux";
import { RootState } from "../../config/redux/store";
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
    return (
       <div> 
        <div className='head inline-flex flex  '>
        <h1 className='font-bold text-xl mt-2 mb-1'>Information Account</h1>
        {disabled?<Button type='secondary' color="secondary-normal" onClick={off} ><Icon icon={"typcn:edit"}></Icon>Edit Profile</Button>:""}
        </div>
        <div className='body'>
          <form>
        <>
        <div className="flex flex-col mb-1 mt-2">
          <label htmlFor="fullName" className='text-lg'>Nama Lengkap</label>
          <InputComponent
            type="text"
            id="fullName"
            name="fullName"
            value={userData.fullName}
            // onChange={handleChange}
            customStyle="py-3 pl-4 pr-4 mb-5"
            placeholder="Full Name"
            disabled={disabled ? true : false}
          />
        </div>
  
        {/* Date of Birth Input */}
        <div className="flex flex-col mb-1 mt-2">
          <label htmlFor="tanggalLahir" className='block'>Tanggal Lahir</label>
          <InputComponent
            type="text"
            id="tanggalLahir"
            name="tanggalLahir"
            value={userData.birthDate === null ? "-" : birthDateUser.toLocaleDateString("id-ID")}
            customStyle="py-3 pl-4 pr-4"
            // onChange={handleChange}
            placeholder=""
            disabled={disabled ? true : false}
          />
        </div>
        <div className="flex flex-col mb-1 mt-5">
          <label htmlFor="gender" className='block'>Gender</label>
          <select
            name="gender"
            id="gender"
            // onChange={handleOnSelect}
            className="appearance-none shadow-sm transition duration-200 focus:ring focus:ring-blue-500/60 border rounded-[10px] w-full py-[20px] pr-[27px] text-gray-700 border-[#757575] leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline pl-[27px]"
            disabled={disabled ? true : false}
            >
            <option value={userData.gender === null ? "-" : userData.gender} selected>{userData.gender === null ? "-" : userData.gender}</option>
            <option value="Laki-laki">Laki-laki</option>
            <option value="Perempuan">Perempuan</option>
          </select>
        </div>
        <div className="flex flex-col mb-1 mt-2">
          <label htmlFor="email" className='block'>Email</label>
          <InputComponent
            type="email"
            id="email"
            name="email"
            value={userData.email}
            customStyle="py-3 pl-4 pr-4"
            // onChange={handleChange}
            placeholder=""
            disabled={disabled ? true : false}
          />
        </div>
        <div className="flex flex-col mb-1 mt-2">
          <label htmlFor="phone" className='block'>Telephone</label>
          <InputComponent
            type="phone"
            id="phone"
            name="phone"
            value={userData.noHp ? userData.noHp : "-"}
            customStyle="py-3 pl-4 pr-4"
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

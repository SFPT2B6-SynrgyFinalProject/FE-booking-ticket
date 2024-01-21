import { useEffect, useState } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Outlet, useLocation } from 'react-router';
function Profile() {
  const location = useLocation();
    const[active,setActive] = useState<number>(1)
  // Update active value based on the current route
  useEffect(() => {
    if (location.pathname === '/profile/reset') {
      setActive(2);
    } else {
      // Set the default active value or update it based on other routes
      setActive(1);
    }
  }, [location.pathname]);

  return (
    <div className="justify-center items-center block lg:h-full bg-white mt-3">
      <div className="container mx-auto md:pt-16 md:pl-16 lg:pt-5 flex flex-col lg:flex-row">
        {/* Profile Image Section */}
        <div className="shadow-xl md:w-[400px] rounded-xl ml-6 lg:mr-4 h-[300px] p-5 mr-6 mb-8">
          <div className='inline-flex mb-8'>
            <div className='flex items-center justify-center bg-slate-100 ml-6 p-2 h-20 w-20 rounded-full'>
              <Icon
                width={30}
                height={30}
                color="#1C1C1E"
                icon="uil:user"
                className=''
              />
            </div>
            <div className='ml-3 p-2 rounded-md '>
              <h6 className='text-black mb-2'>Nama Pengguna</h6>
              <h6 className='text-black'>Email</h6>
            </div>
          </div>
          <a href='/profile/'><div className='text-black inline-flex w-[100%] pl-5 '>
            <Icon icon={"uil:setting"} className={active === 1 ? "text-blue-900 mt-1 ml-8" : "text-black mt-1 ml-8"} ></Icon>
            <h5 className={active === 1 ? "text-blue-900 ml-5 " : "text-black ml-5 "}> Informasi Akun </h5>
          </div></a>
          <a href='/profile/reset'>
            <div className='text-black inline-flex w-[100%] mt-2 pl-5'>
              <Icon icon={"mingcute:eye-line"} className={active === 2 ? "text-blue-900 mt-1 ml-8" : "text-black mt-1 ml-8"} ></Icon>
              <h5 className={active === 2 ? "text-blue-900 ml-5 " : "text-black ml-5 "}> Password </h5>
            </div>
          </a>
          <div className='text-black inline-flex w-[100%] mt-2 pl-5'>
            <Icon icon={"icons8:shutdown"} className={active === 3 ? "text-blue-900 mt-1 ml-8" : "text-black mt-1 ml-8"} ></Icon>
            <h5 className={active === 3 ? "text-blue-900 ml-5 " : "text-black ml-5 "}> Log Out </h5>
          </div>
        </div>

        {/* Information Account Section */}
        <div className='shadow-xl rounded-xl md:h-[700px] p-8 md:w-full lg:w-3/4 mb-8'>
          <Outlet  ></Outlet>
        </div>
      </div>
      {/* Footer */}
    </div>
  );
}

export default Profile;

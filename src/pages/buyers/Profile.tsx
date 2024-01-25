import { useEffect, useState } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Outlet, useLocation } from 'react-router';
import { useSelector } from 'react-redux';
import { RootState } from '../../config/redux/store';
import { Card } from '../../components/Card';
import { ContainerPage } from '../../components/common-page/ContainerPage';
function Profile() {
  const location = useLocation();
    const[active,setActive] = useState<number>(1);
    const userData = useSelector((state: RootState) => state.userReducer);
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
<ContainerPage>
      <div className="container mx-auto md:pt-16 md:pl-16 lg:pt-5 flex flex-col lg:flex-row">
        {/* Profile Image Section */}
        <Card customStyle='mr-5 h-1/3 md:w-1/3 mb-8 sm:w-full'>
          <div className='inline-flex mb-4 '>
            <div className='flex items-center justify-center bg-slate-100  h-20 w-20 rounded-full'>
              <Icon
                width={30}
                height={30}
                color="#1C1C1E"
                icon="uil:user"
                className=''
              />
            </div>
            <div className='ml-3 p-2 rounded-md '>
              <h6 className='text-black mb-2'>{userData.fullName}</h6>
              <h6 className='text-black'>{userData.email}</h6>
            </div>
          </div>
          <a href='/profile/'><div className='text-black inline-flex w-[100%] pl-5 '>
            <Icon icon={"uil:setting"} className={active === 1 ? "text-blue-900 mt-1 " : "text-black mt-1 "} ></Icon>
            <h5 className={active === 1 ? "text-blue-900 ml-5 " : "text-black ml-5 "}> Informasi Akun </h5>
          </div></a>
          <a href='/profile/reset'>
            <div className='text-black inline-flex w-[100%] mt-2 pl-5'>
              <Icon icon={"mingcute:eye-line"} className={active === 2 ? "text-blue-900 mt-1 " : "text-black mt-1 "} ></Icon>
              <h5 className={active === 2 ? "text-blue-900 ml-5 " : "text-black ml-5 "}> Password </h5>
            </div>
          </a>
          <div className='text-black inline-flex w-[100%] mt-2 pl-5'>
            <Icon icon={"icons8:shutdown"} className={active === 3 ? "text-blue-900 mt-1 " : "text-black mt-1 "} ></Icon>
            <h5 className={active === 3 ? "text-blue-900 ml-5 " : "text-black ml-5 "}> Log Out </h5>
          </div>
          </Card>

        {/* Information Account Section */}
        <Card  customStyle="md:pt-10 w-full mb-4 p-10" >
        
          <Outlet  ></Outlet>
        
        </Card>
      </div>
      {/* Footer */}
      </ContainerPage>
  );
}

export default Profile;

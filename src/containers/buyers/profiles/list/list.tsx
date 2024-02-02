import { Icon } from "@iconify/react/dist/iconify.js";
import { Outlet } from "react-router";
import { Card } from "../../../../components/Card";
import { ContainerPage } from "../../../../components/common-page/ContainerPage";
import useAction from "./list.hooks";


function Profile() {
  const { active, profiles } = useAction();

  return (
    <ContainerPage>
      <div className="flex flex-col items-center lg:items-start lg:flex-row">
        {/* Profile Image Section */}
        <Card customStyle="w-full mb-10 h-1/3 lg:w-5/12 lg:!px-6 lg:mr-5 lg:mb-0">
          <div className="flex items-center gap-x-2 mb-4">
            <div className="flex items-center justify-center bg-slate-100 h-20 w-20 rounded-full">
              <Icon width={30} height={30} color="#1C1C1E" icon="uil:user" className="" />
            </div>

            <div className="rounded-md font-medium">
              <h6 className="mb-0.5 text-black">{profiles.fullName}</h6>
              <h6 className="text-sm text-gray-600">{profiles.email}</h6>
            </div>
          </div>

          <div className="ml-8 font-medium">
            <a href="/profile/">
              <div className="text-black inline-flex w-full items-center gap-x-10">
                <Icon icon={"uil:setting"} className={active === 1 ? "text-blue-600" : ""} />

                <h5 className={active === 1 ? "text-blue-600" : ""}> Informasi Akun </h5>
              </div>
            </a>

            <a href="/profile/reset">
              <div className="text-black inline-flex w-full items-center gap-x-10 mt-2">
                <Icon
                  icon={"mingcute:eye-line"}
                  className={active === 2 ? "text-blue-600" : ""}
                ></Icon>
                <h5 className={active === 2 ? "text-blue-600" : ""}> Password </h5>
              </div>
            </a>

            <div className="text-black inline-flex w-full items-center gap-x-10 mt-2">
              <Icon icon={"icons8:shutdown"} className={active === 3 ? "text-blue-600" : ""}></Icon>
              <h5 className={active === 3 ? "text-blue-600" : ""}> Log Out </h5>
            </div>
          </div>
        </Card>

        {/* Information Account Section */}
        <Card customStyle="w-full">
        
          <Outlet></Outlet>
        </Card>
      </div>
      {/* Footer */}
    </ContainerPage>
  );
}

export default Profile;

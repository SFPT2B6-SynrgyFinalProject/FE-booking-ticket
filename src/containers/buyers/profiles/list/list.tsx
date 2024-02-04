import { Icon } from "@iconify/react/dist/iconify.js";
import { Outlet } from "react-router";
import { Card } from "../../../../components/Card";
import { ContainerPage } from "../../../../components/common-page/ContainerPage";
import useAction from "./list.hooks";
import { FormModal } from "../../../../components/FormModal";
import  Button  from "../../../../components/Button";

function Profile() {
  const { active, profiles, handleLogOut , logOut, setPurge,berhasilLogOut,handleRedirect} = useAction();
console.log(logOut)
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
            <a href="#" id="logOut" onClick={handleLogOut}>
              <div className="text-black inline-flex w-full items-center gap-x-10 mt-2">
              <Icon icon={"icons8:shutdown"} className={active === 3 ? "text-blue-600" : ""}></Icon>
              <h5 className={active === 3 ? "text-blue-600" : ""}> Log Out </h5>
            </div>
          </a>

          </div>
        </Card>
   
        {/* Information Account Section */}
        <Card customStyle="w-full">
        <>
      {logOut || berhasilLogOut ? (
        
        <FormModal title="" isOpen={true}>
          <div className="text-center flex flex-col items-center justify-center h-full">
            {logOut ? (
              <h3 className="font-bold text-lg mb-4">Apa anda yakin untuk logout</h3>
            ) : (
              
              <h3 className="text-lg font-bold mb-4">
                <center><Icon icon="uil:check-circle" className="text-green-600" width={100} height={100} /></center>
                Anda berhasil logout
              </h3>
            )}

            <div className="flex gap-4">
              {logOut ? (
                <>
                  <Button type="danger" color="danger" onClick={setPurge}>
                    Ya
                  </Button>
                  <a href="#" id="batal" onClick={handleLogOut} >
                    <Button type="primary" color="primary-normal">
                      Tidak
                    </Button>
                  </a>
                </>
              ) : (
                <Button type="primary" color="primary-normal" onClick={handleRedirect}>
                  OK
                </Button>
              )}
            </div>
          </div>
        </FormModal>
      ) : null}
    </>

          <Outlet></Outlet>
        </Card>
      </div>
      {/* Footer */}
    </ContainerPage>
  );
}

export default Profile;

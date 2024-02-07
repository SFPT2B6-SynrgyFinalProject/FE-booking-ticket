import { Icon } from "@iconify/react/dist/iconify.js";
import noNotificationImg from "../../../../assets/images/undraw_fresh_notification.png";
import { ContainerPage } from "../../../../components/common-page/ContainerPage";
import { Card } from "../../../../components/Card";
import useAction from "./list.hooks";

export default function Notification() {
  const { notifications, isLoading } = useAction();
  console.log(notifications);

  const notificationsArray = Array.isArray(notifications) ? notifications : [];

  return (
    <>
      <ContainerPage>
        <Card customStyle="sm:px-0">
          <div className="border-b-2 w-full border-gray-500/70 pb-8 mt-2 mb-10">
            <h3 className="pl-10 font-bold text-2xl">Notifikasi</h3>
          </div>
          {isLoading ? (
            <>
              <section className="relative rounded-[30px] z-[1] bg-black w-[27.9rem] lg:w-full h-full opacity-10"></section>
              <div
                role="status"
                className="relative z-[2] text-white mt-56 lg:mt-28 text-center left-[47%]"
              >
                <div className="animate-spin rounded-full w-10 h-10 bg-gradient-to-tr from-blue-600 to-blue-300">
                  <div className="h-6 w-6 rounded-full bg-gray-100"></div>
                </div>
              </div>
            </>
          ) : notificationsArray.length === 0 ? (
            <div className="flex flex-col justify-center items-center h-96">
              <img src={noNotificationImg} alt="Empty Notif" className="mb-20" />
              <p className="text-2xl font-bold">Tidak ada notifikasi</p>
              <p className="font-bold mt-3">Semua Notifikasi Anda Akan Ditampilkan Disini</p>
            </div>
          ) : (
            notificationsArray?.map((notification) => (
              <div
                key={(notification as { id: number }).id}
                className="bg-[#F5F5F5] flex flex-col lg:flex-row items-center border rounded-3xl shadow-xl p-10 mb-10 w-4/5 mx-auto gap-6 lg:gap-14"
              >
                <figure className="p-2 bg-blue-700 rounded-full">
                  <Icon icon="carbon:purchase" width={70} className="text-white py-3" />
                </figure>
                <section className="font-semibold text-sm flex flex-col gap-3 lg:gap-6 grow">
                  <p>Pembayaran Berhasil</p>
                  <p>
                    {(notification as { content: string }).content}
                  </p>
                </section>
              </div>
            ))
          )}
        </Card>
      </ContainerPage>
    </>
  );
}

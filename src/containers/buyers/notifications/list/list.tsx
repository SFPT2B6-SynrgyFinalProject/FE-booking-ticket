import { Icon } from "@iconify/react/dist/iconify.js";
import noNotificationImg from "../../../../assets/images/undraw_fresh_notification.png";
import { ContainerPage } from "../../../../components/common-page/ContainerPage";
import { Card } from "../../../../components/Card";
import useAction from "./list.hooks";
import Skeleton from "react-loading-skeleton";

export default function Notification() {
  const { notifications, getLoading } = useAction();

  const notificationsArray = Array.isArray(notifications) ? notifications : [];

  return (
    <>
      <ContainerPage>
        <Card customStyle="sm:px-0">
          <div className="w-full pb-8 mt-2 mb-10 border-b-2 border-gray-500/70">
            <h3 className="pl-10 text-2xl font-bold">Notifikasi</h3>
          </div>
          {getLoading.isLoading ? (
            <>
              <Skeleton className="flex items-center w-4/5 mx-auto mb-3 h-44 rounded-2xl" />
              <Skeleton className="flex items-center w-4/5 mx-auto h-44 rounded-2xl" />
            </>
          ) : notificationsArray.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-96">
              <img src={noNotificationImg} alt="Empty Notif" className="mb-20" />
              <p className="text-2xl font-bold">Tidak ada notifikasi</p>
              <p className="mt-3 font-bold">Semua Notifikasi Anda Akan Ditampilkan Disini</p>
            </div>
          ) : (
            notificationsArray?.map((notification) => (
              <div
                key={(notification as { id: number }).id}
                className="bg-[#F5F5F5] flex flex-col lg:flex-row items-center border rounded-3xl shadow-xl p-10 mb-10 lg:w-4/5 lg:mx-auto gap-6 lg:gap-14"
              >
                <figure className="flex items-center p-2 bg-blue-700 rounded-full lg:size-26">
                  <Icon icon="carbon:purchase" width={60} className="text-white lg:py-2" />
                </figure>
                <section className="flex flex-col gap-3 lg:gap-6 grow">
                  <p className="text-lg font-bold">Pembayaran Berhasil</p>
                  <p className="font-semibold text-justify">
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

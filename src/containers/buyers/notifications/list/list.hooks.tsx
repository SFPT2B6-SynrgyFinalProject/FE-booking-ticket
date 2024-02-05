import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../config/redux/store";
import { setNotifications } from "../../../../config/redux/action/notificationAction";
// import { INotifications } from "../notifications.types";



export default function useList() {
  const dispatch = useDispatch();
  const notifications = useSelector((state: RootState) => state.notificationReducer.notifications);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem("user_access_token");
        const response = await fetch("https://be-finpro-ev4x53wgca-uc.a.run.app/api/notifications",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });

        const responseData = await response.json();

        // const data = {
        //   "data": {
        //     "notification": [
        //       {
        //         "id": 2,
        //         "content": "Pembayaran tiket pesawat dengan Order id: 81778de tujuan Balikpapan - Jakarta berhasil dilakukan. Silahkan akses halaman Pesanan untuk melihat detail pembelian anda",
        //         "title": "Pembayaran Berhasil",
        //         "createdDatetime": "2024-02-02T15:13:42.692Z",
        //         "imageUrl": "/icon/payment.png"
        //       },
        //       {
        //         "id": 1,
        //         "content": "Pembayaran tiket pesawat dengan Order id: 323c79e tujuan Balikpapan - Jakarta berhasil dilakukan. Silahkan akses halaman Pesanan untuk melihat detail pembelian anda",
        //         "title": "Pembayaran Berhasil",
        //         "createdDatetime": "2024-02-02T15:11:35.881Z",
        //         "imageUrl": "/icon/payment.png"
        //       }
        //     ]
        //   },
        //   "message": "Notifikasi berhasil didapatkan",
        //   "status": "success"
        // };

        // Untuk menguji dengan data dummy
        // const data = [
        //   {
        //     "id": 2,
        //     "content": "Pembayaran tiket pesawat dengan Order id: 81778de tujuan Balikpapan - Jakarta berhasil dilakukan. Silahkan akses halaman Pesanan untuk melihat detail pembelian anda",
        //     "title": "Pembayaran Berhasil",
        //     "createdDatetime": "2024-02-02T15:13:42.692Z",
        //     "imageUrl": "/icon/payment.png"
        //   },
        //   {
        //     "id": 1,
        //     "content": "Pembayaran tiket pesawat dengan Order id: 323c79e tujuan Balikpapan - Jakarta berhasil dilakukan. Silahkan akses halaman Pesanan untuk melihat detail pembelian anda",
        //     "title": "Pembayaran Berhasil",
        //     "createdDatetime": "2024-02-02T15:11:35.881Z",
        //     "imageUrl": "/icon/payment.png"
        //   }
        // ];

        // Untuk menguji dengan data kosong
        // const data: INotifications[] = [];

        console.log(responseData);
        // const notificationsData: INotifications[] = responseData.data.notification;

        // logic untuk handle data dummy dan data kosong
        // const notificationsData: INotifications[] = data.map((notification) => ({
        //   id: notification.id,
        //   content: notification.content,
        //   title: notification.title,
        //   createdDatetime: notification.createdDatetime,
        //   imageUrl: notification.imageUrl
        // }));

        dispatch(setNotifications(responseData.data.notification));
      } catch (error) {
        console.log(error);
      }
    };

    fetchNotifications();
  }, [dispatch]);

  return {
    notifications,
  };
}

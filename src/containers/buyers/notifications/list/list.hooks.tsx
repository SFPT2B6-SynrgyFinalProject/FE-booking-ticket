/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { INotifications } from "../notifications.types";

export default function useList() {
  const [notifications, setNotifications] = useState<INotifications[]>([]);

  // misal data from api
  const data = [
    {
      id: 1,
      title: "Transaksi 1",
      body: "oke berhasil",
    },
    {
      id: 2,
      title: "Transaksi 2",
      body: "oke berhasil 2",
    },
  ];

  const fetchNotifications = async () => {
    try {
      // logic fetch data
      setNotifications(data);
    } catch (error) {
      console.log("error");
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return {
    notifications,
  };
}

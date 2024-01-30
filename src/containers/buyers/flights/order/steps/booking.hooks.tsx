/* eslint-disable react-hooks/exhaustive-deps */
// import { useState, useEffect } from "react";
// import { IFlightData } from "./../../flights.types";

export default function useFlightOrder() {
  //   const [notifications, setNotifications] = useState<IFlightData[]>([]);

  // misal data from api
  //   const data = [
  //     {
  //       id: 1,
  //       title: "Transaksi 1",
  //       body: "oke berhasil",
  //     },
  //     {
  //       id: 2,
  //       title: "Transaksi 2",
  //       body: "oke berhasil 2",
  //     },
  //   ];

  //   const fetchNotifications = async () => {
  //     try {
  //       // logic fetch data
  //       setNotifications(data);
  //     } catch (error) {
  //       console.log("error");
  //     }
  //   };

  //   useEffect(() => {
  //     fetchNotifications();
  //   }, []);

  const flightOrderData = {
    ticketId: 9805,
    classId: 1,
    orderer: {
      fullName: "Tuan hanif abdu",
      phoneNumber: "081222221111",
      email: "abdurrasyidhanif@gmail.com",
    },
    passengerDetails: {
      adult: ["Tuan Aljovan", "Nyonya Ros"],
      child: ["Nona meimei", "Nona Susanti"],
      infant: ["Tuan Upin"],
    },
  };

  const handleSubmitFlightOrder = () => {
    console.log("Submit flight data nihhh!");
    alert("Flight Order Data");
  };

  return {
    // notifications,
    handleSubmitFlightOrder,
    flightOrderData,
  };
}

/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { ISearch } from "../home.types";

export default function useHome() {
  const [homeData, setHomeData] = useState<ISearch[]>([]);

  // misal data from api
  const data = [
    {
      from: "Jakarta",
      to: "Denpasar",
      class: "Ekonomi",
      depatureDate: "29-01-2024",
      depatureArrival: "30-01-2024",
      person: "Dewasa 1",
    },
  ];

  const fetchhomeData = async () => {
    try {
      // logic fetch data
      setHomeData(data);
    } catch (error) {
      console.log("error");
    }
  };

  useEffect(() => {
    fetchhomeData();
  }, []);

  return {
    homeData,
  };
}

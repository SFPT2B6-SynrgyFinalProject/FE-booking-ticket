/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { ISearch } from "../home.types";

export default function useSearch() {
  const [searchData, setSearchData] = useState<ISearch[]>([]);

  // misal data from api
  const data = [
    {
      from: "Jakarta Search Result",
      to: "Denpasar Search Result",
      class: "Ekonomi Search Result",
      depatureDate: "29-01-2024 Search Result",
      depatureArrival: "30-01-2024 Search Result",
      person: "Dewasa 1 Search Result",
    },
  ];

  const fetchSearchData = async () => {
    try {
      // logic fetch data
      setSearchData(data);
    } catch (error) {
      console.log("error");
    }
  };

  useEffect(() => {
    fetchSearchData();
  }, []);

  return {
    searchData,
  };
}

import { useState, useEffect } from "react";
import { IOrders } from "../orders.types";
import { fetchInstance } from "../../../../lib/services/core";
import { useUserToken } from "../../../../lib/services/userToken";

export default function useList() {
  const [records, setRecords] = useState<IOrders[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [originalRecords, setOriginalRecords] = useState<IOrders[]>([]);

  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      const response = await fetchInstance({
        authToken: useUserToken(),
        endpoint: "/api/admin/orders?dataPerPage=50&page=1",
        method: "GET",
      });

      const orders = response.data.orders;

      setRecords(orders);
      setOriginalRecords(orders);
    } catch (error) {
      console.log("error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value.toLocaleLowerCase();
    const newData = originalRecords.filter(
      (row: { orderId: string; fullName: string; airline: string; status: string }) => {
        return (
          row.orderId.toLowerCase().includes(searchValue) ||
          row.fullName.toLowerCase().includes(searchValue) ||
          row.airline.toLowerCase().includes(searchValue) ||
          row.status.toLowerCase().includes(searchValue)
        );
      }
    );

    setRecords(newData);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return {
    records,
    handleSearch,
    isLoading,
  };
}

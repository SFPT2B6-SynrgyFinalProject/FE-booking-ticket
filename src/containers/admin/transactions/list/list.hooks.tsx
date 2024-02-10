/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { ITransactions, getTransactions } from "../transactions.types";

export default function useList() {
  const [records, setRecords] = useState<ITransactions[]>([]);
  const [originalRecords, setOriginalRecords] = useState<ITransactions[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchTransactions = async () => {
    try {
      setIsLoading(true);
      const response = await getTransactions();
      const sortedTransactions = response.data.transactions.sort((a: ITransactions, b: ITransactions) => b.number - a.number);

      setRecords(sortedTransactions);
      setOriginalRecords(response.data.transactions);
    } catch (error) {
      console.log("error");
    } finally {
      setIsLoading(false);
    }
  };
  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value.toLocaleLowerCase();
    const newData = originalRecords.filter((row: { orderId: string; status: string }) => {
      return (
        row.orderId.toLowerCase().includes(searchValue) ||
        row.status.toLowerCase().includes(searchValue)
      );
    });
    setRecords(newData);
  };

  const handleDetail = (id: string): void => {
    console.log(`Deleting record with ID ${id}`);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return {
    records,
    handleDetail,
    handleFilter,
    isLoading,
  };
}

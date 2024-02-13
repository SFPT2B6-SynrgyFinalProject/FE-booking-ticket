/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { ITransactions, ITransactionsDetail, getTransactionDetail, getTransactions } from "../transactions.types";

export default function useList() {
  const [records, setRecords] = useState<ITransactions[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [recordsDetail, setRecordsDetail] = useState<ITransactionsDetail[]>([]);
  const [judul, setJudul] = useState("");
  const [originalRecords, setOriginalRecords] = useState<ITransactions[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);

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

  const clickOpen = async (orderId: any) => {
    handleDetail(orderId);
    setOpen(true);
  };

  const clickClose = (): void => {
    setOpen(false);
  };

  const handleDetail = async (orderId: any) => {
    setJudul(`Detail Transaksi - ${orderId.toUpperCase()}`);
    try {
      setIsLoading2(true);
      const response = await getTransactionDetail(orderId);
      if (response.status === 'success') {
        setRecordsDetail([response.data]);
        setOpen(true);
      }
      console.log(recordsDetail)
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading2(false);
    }
  };

  // const handleDetail = (orderId: string): void => {
  //   detailFetch(orderId);
  //   console.log(recordsDetail);
  // };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return {
    records,
    recordsDetail,
    judul,
    handleDetail,
    open,
    clickOpen,
    clickClose,
    handleFilter,
    isLoading,
    isLoading2,
  };
}

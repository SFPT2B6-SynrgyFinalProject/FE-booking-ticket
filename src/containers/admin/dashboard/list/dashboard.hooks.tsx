import { SwipeAction, TrailingActions } from "react-swipeable-list";
import { fetchInstance } from "../../../../lib/services/core";
import { useUserToken } from "../../../../lib/services/userToken";
import {
  DetailTransaction,
  Order,
  PopularAirlineType,
  Transaction,
  UserActive,
} from "./dashbord.types";
import { useEffect, useState } from "react";
import { getCurrentDate } from "../../../../lib";
import { getYestedayDate } from "../../../../lib/currentDate";
import { Icon } from "@iconify/react/dist/iconify.js";

const useToken = useUserToken();

export const trailingActions = (numb: number) => (
  <TrailingActions>
    <SwipeAction onClick={() => console.info("swipe action triggered")}>
      <div className="flex items-center mx-10 w-3 text-white font-semibold text-3xl cursor-pointer">
        {numb}
      </div>
    </SwipeAction>
  </TrailingActions>
);

export const usePopularAirline = () => {
  const [popularAirline, setPopularAriline] = useState<PopularAirlineType>();
  const [isLoadingPopularAirline, setIsLoadingPopularAirline] =
    useState<boolean>(false);
  useEffect(() => {
    const getPopularAirline = async () => {
      setIsLoadingPopularAirline(true);
      try {
        const result = await fetchInstance({
          endpoint: "/api/admin/airlines?dataPerPage=5&page=1",
          method: "GET",
          authToken: useToken,
        });
        setPopularAriline(result.data);
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        }
      } finally {
        setIsLoadingPopularAirline(false);
      }
    };
    getPopularAirline();
  }, []);

  return { popularAirline, isLoadingPopularAirline };
};

export const useUserActive = () => {
  const [userActive, setUserActive] = useState<string>("");
  const [isLoadingUserActive, setIsLoadingUserActive] =
    useState<boolean>(false);
  const dataPerPage: number = 5;
  useEffect(() => {
    const getUserActive = async () => {
      try {
        setIsLoadingUserActive(true);
        const result: UserActive = await fetchInstance({
          endpoint: `/api/admin/users?dataPerPage=${dataPerPage}&page=1`,
          method: "GET",
          authToken: useToken,
        });
        const totalUserActive: number = result.data.lastPage * dataPerPage;
        const results: UserActive = await fetchInstance({
          endpoint: `/api/admin/users?dataPerPage=${totalUserActive}&page=1`,
          method: "GET",
          authToken: useToken,
        });
        setUserActive(results.data.dataInPage.toString());
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        }
      } finally {
        setIsLoadingUserActive(false);
      }
    };
    getUserActive();
  }, []);
  return { userActive, isLoadingUserActive };
};

export const useTotalOrder = () => {
  const [totalOrder, setTotalOrder] = useState<string>("");
  const [isLoadingTotalOrder, setIsLoadingTotalOrder] =
    useState<boolean>(false);
  const dataPerPage: number = 5;

  useEffect(() => {
    const getNewOrder = async () => {
      try {
        setIsLoadingTotalOrder(true);
        const result: Order = await fetchInstance({
          endpoint: `/api/admin/orders?dataPerPage=${dataPerPage}&page=1`,
          method: "GET",
          authToken: useToken,
        });
        const totalNewOrder: number = result.data.lastPage * dataPerPage;
        const results: Order = await fetchInstance({
          endpoint: `/api/admin/transactions?dataPerPage=${totalNewOrder}&page=1`,
          method: "GET",
          authToken: useToken,
        });
        setTotalOrder(results.data.dataInPage.toString());
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        }
      } finally {
        setIsLoadingTotalOrder(false);
      }
    };
    getNewOrder();
  }, []);

  return { totalOrder, isLoadingTotalOrder };
};

export const useTransaction = () => {
  const [totalTransaction, setTotalTransaction] = useState<string>("");
  const [isLoadingTotalTrasaction, setIsLoadingTotalTrasaction] =
    useState<boolean>(false);
  const [isLoadingDetailTransaction, setIsLoadingDetailTransaction] =
    useState<boolean>(false);
  const [doneTotalFlight, setDoneTotalFlight] = useState<string>("");
  const [detailTransactionToday, setDetailTransactionToday] = useState<
    DetailTransaction[]
  >([]);
  const [detailTransactionYesterday, setDetailTransactionYesterday] = useState<
    DetailTransaction[]
  >([]);
  const dataPerPage: number = 10;

  useEffect(() => {
    const getTotalTransaction = async () => {
      try {
        setIsLoadingTotalTrasaction(true);
        const result: Transaction = await fetchInstance({
          endpoint: `/api/admin/transactions?dataPerPage=${dataPerPage}&page=1`,
          method: "GET",
          authToken: useToken,
        });
        const totalNewOrder: number = result.data.lastPage * dataPerPage;
        const results: Transaction = await fetchInstance({
          endpoint: `/api/admin/transactions?dataPerPage=${totalNewOrder}&page=1`,
          method: "GET",
          authToken: useToken,
        });
        setTotalTransaction(results.data.dataInPage.toString());
        const completedTransaction = results.data.transactions.filter(
          (data) => {
            return data.status.toLowerCase() === "selesai";
          }
        ).length;
        setDoneTotalFlight(completedTransaction.toString());
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        }
      } finally {
        setIsLoadingTotalTrasaction(false);
      }
    };
    const getDetailTransaction = async () => {
      try {
        setIsLoadingDetailTransaction(true);
        const result: Transaction = await fetchInstance({
          endpoint: `/api/admin/transactions?dataPerPage=${dataPerPage}&page=1`,
          method: "GET",
          authToken: useToken,
        });
        const todayTransaction = result.data.transactions.filter((data) => {
          return data.transactionDate.includes(getCurrentDate());
        });
        const yesterdayTransaction = result.data.transactions.filter((data) => {
          return data.transactionDate.includes(getYestedayDate());
        });
        setDetailTransactionToday(todayTransaction);
        setDetailTransactionYesterday(yesterdayTransaction);
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        }
      } finally {
        setIsLoadingDetailTransaction(false);
      }
    };
    getTotalTransaction();
    getDetailTransaction();
  }, []);

  return {
    totalTransaction,
    doneTotalFlight,
    isLoadingTotalTrasaction,
    isLoadingDetailTransaction,
    detailTransactionToday,
    detailTransactionYesterday,
  };
};

export const useBgColor = (status: string) => {
  switch (status) {
    case "success":
      return "bg-blue-500";

    case "cancel":
      return "bg-red-500";

    case "on-going":
      return "bg-yellow-500";

    default:
      return "bg-red-500";
  }
};

export const useIcon = (icon: string) => {
  switch (icon) {
    case "success":
      return <Icon icon="mdi:user" width={23} className="text-white" />;

    case "cancel":
      return (
        <Icon icon="material-symbols:cancel-outline" className="text-white" />
      );

    case "on-going":
      return (
        <Icon icon="material-symbols:pending-actions" className="text-white" />
      );

    default:
      return <Icon icon="mi:notification" className="text-white" />;
  }
};

import { SwipeAction, TrailingActions } from "react-swipeable-list";
import { fetchInstance } from "../../../../lib/services/core";
import { useUserToken } from "../../../../lib/services/userToken";
import {
  DetailOrder,
  Order,
  PopularAirlineType,
  Transaction,
  UserActive,
} from "./dashbord.types";
import { useEffect, useState } from "react";
import { getCurrentDate } from "../../../../lib";
import { getYestedayDate } from "../../../../lib/currentDate";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useUserRole } from "../../../../lib/services/auth";

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
  const [popularAirline, setPopularAriline] = useState<PopularAirlineType>({
    airlines: [],
  });
  const [isLoadingPopularAirline, setIsLoadingPopularAirline] =
    useState<boolean>(false);
  useEffect(() => {
    const getPopularAirline = async () => {
      setIsLoadingPopularAirline(true);
      try {
        const result = await fetchInstance({
          endpoint: "/api/admin/airlines?dataPerPage=5&page=1",
          method: "GET",
          authToken: useUserToken(),
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
  return { popularAirline: popularAirline.airlines, isLoadingPopularAirline };
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
          authToken: useUserToken(),
        });
        const totalUserActive: number = result.data.lastPage * dataPerPage;
        const results: UserActive = await fetchInstance({
          endpoint: `/api/admin/users?dataPerPage=${totalUserActive}&page=1`,
          method: "GET",
          authToken: useUserToken(),
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
          authToken: useUserToken(),
        });
        const totalNewOrder: number = result.data.lastPage * dataPerPage;
        const results: Order = await fetchInstance({
          endpoint: `/api/admin/transactions?dataPerPage=${totalNewOrder}&page=1`,
          method: "GET",
          authToken: useUserToken(),
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
  const [doneTotalFlight, setDoneTotalFlight] = useState<string>("");
  const dataPerPage: number = 10;

  useEffect(() => {
    const getTotalTransaction = async () => {
      try {
        setIsLoadingTotalTrasaction(true);
        const result: Transaction = await fetchInstance({
          endpoint: `/api/admin/transactions?dataPerPage=${dataPerPage}&page=1`,
          method: "GET",
          authToken: useUserToken(),
        });
        const totalNewOrder: number = result.data.lastPage * dataPerPage;
        const results: Transaction = await fetchInstance({
          endpoint: `/api/admin/transactions?dataPerPage=${totalNewOrder}&page=1`,
          method: "GET",
          authToken: useUserToken(),
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
    if (useUserToken() && useUserRole() === "ROLE_ADMIN") {
      getTotalTransaction();
    }
  }, []);

  return {
    totalTransaction,
    doneTotalFlight,
    isLoadingTotalTrasaction,
  };
};

export const useFilterByOrderId = () => {
  const [detailOrderToday, setDetailOrderToday] = useState<DetailOrder[]>([]);
  const [detailOrderYesterday, setDetailOrderYesterday] = useState<
    DetailOrder[]
  >([]);
  const [isLoadingOrder, setIsLoadingOrder] = useState<boolean>(false);
  const dataPerPage: number = 10;

  useEffect(() => {
    const getOrder = async () => {
      try {
        setIsLoadingOrder(true);
        const resultOrder: Order = await fetchInstance({
          endpoint: `/api/admin/orders?dataPerPage=${dataPerPage}&page=1`,
          method: "GET",
          authToken: useUserToken(),
        });
        const resultTransaction: Transaction = await fetchInstance({
          endpoint: `/api/admin/transactions?dataPerPage=${dataPerPage}&page=1`,
          method: "GET",
          authToken: useUserToken(),
        });
        const result = resultOrder.data.orders
          .map((dataOrder) => {
            const transaction = resultTransaction.data.transactions.find(
              (dataTransaction) => dataOrder.orderId === dataTransaction.orderId
            );
            if (transaction) {
              return {
                ...dataOrder,
                transactionDate: transaction.transactionDate,
              };
            }
            return null;
          })
          .filter((dataOrder) => dataOrder !== null);
        const todayOrder = result
          .filter((todayOrader) =>
            todayOrader?.transactionDate.includes(getCurrentDate())
          )
          .map((todayOrder) => todayOrder);
        const YesterdayOrder = result
          .filter((yesterdarOrder) =>
            yesterdarOrder?.transactionDate.includes(getYestedayDate())
          )
          .map((yesterdayOrder) => yesterdayOrder);
        setDetailOrderToday(
          todayOrder.filter((item) => item !== null) as DetailOrder[]
        );
        setDetailOrderYesterday(
          YesterdayOrder.filter((item) => item !== null) as DetailOrder[]
        );
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        }
      } finally {
        setIsLoadingOrder(false);
      }
    };
    if (useUserToken() && useUserRole() === "ROLE_ADMIN") {
      getOrder();
    }
  }, []);

  return {
    detailOrderToday,
    detailOrderYesterday,
    isLoadingOrder,
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

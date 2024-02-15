import { useState, useEffect } from "react";
import { IOrdersData } from "../orders.types";
import { fetchInstance } from "../../../../lib/services/core";
import { useUserToken } from "../../../../lib/services/userToken";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./../../../../config/redux/store";
import { setIsLoading } from "./../../../../config/redux/action";

export default function useList() {
  const getLoading = useSelector((state: RootState) => state.isLoadingReducer);
  const dispatch = useDispatch<AppDispatch>();

  const [orders, setOrders] = useState<IOrdersData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [status, setStatus] = useState<"COMPLETED" | "ONGOING">("ONGOING");

  const fetchOrders = async () => {
    try {
      dispatch(setIsLoading(true));
      const response = await fetchInstance({
        method: "GET",
        endpoint: `/api/orders?status=${status}`,
        authToken: useUserToken(),
      });

      setOrders(response.data.orders);
    } catch (error) {
      console.log("error");
    } finally {
      setLoading(false);
      dispatch(setIsLoading(false));
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [status]);

  return {
    orders,
    getLoading,
    loading,
    status,
    setStatus,
  };
}

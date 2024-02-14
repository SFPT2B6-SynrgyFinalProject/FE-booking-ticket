import { useState, useEffect } from "react";
import { getNotifications } from "../notifications.types";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./../../../../config/redux/store";
import { setIsLoading } from "./../../../../config/redux/action";

export default function useList() {
  const [notifications, setNotifications] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  const getLoading = useSelector((state: RootState) => state.isLoadingReducer);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        dispatch(setIsLoading(true));
        const response = await getNotifications();
        setNotifications(response.data.notification);
      } catch (error) {
        console.log(error);
      } finally {
        dispatch(setIsLoading(false));
      }
    };

    fetchNotifications();
  }, []);

  return {
    notifications,
    getLoading,
  };
}

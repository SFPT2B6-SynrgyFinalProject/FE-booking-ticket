import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../config/redux/store";
import { setNotifications } from "../../../../config/redux/action/notificationAction";

export default function useList() {
  const dispatch = useDispatch();
  const notifications = useSelector((state: RootState) => state.notificationReducer.notifications);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem("user_access_token");
        const response = await fetch("https://be-finpro-ev4x53wgca-uc.a.run.app/api/notifications",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });

        const responseData = await response.json();
        console.log(responseData);
        dispatch(setNotifications(responseData.data.notification));
      } catch (error) {
        console.log(error);
      }
    };

    fetchNotifications();
  }, [dispatch]);

  return {
    notifications,
  };
}

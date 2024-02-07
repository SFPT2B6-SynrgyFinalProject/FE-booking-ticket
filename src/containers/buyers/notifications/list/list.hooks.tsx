import { useState, useEffect } from "react";
import { getNotifications } from "../notifications.types";

export default function useList() {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setIsLoading(true);
        const response = await getNotifications();
        setNotifications(response.data.notification);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  return {
    notifications,
    isLoading,
  };
}

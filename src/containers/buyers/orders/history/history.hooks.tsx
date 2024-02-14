/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { DataHistory } from "../orders.types";
import { fetchInstance } from "../../../../lib/services/core";
import { useUserToken } from "../../../../lib/services/userToken";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../config/redux/store";
import { setIsLoading } from "../../../../config/redux/action";

export default function useOrderHistory() {
  const getLoading = useSelector((state: RootState) => state.isLoadingReducer);
  const dispatch = useDispatch<AppDispatch>();
  const { orderId } = useParams();
  const [loading, setLoading] = useState<boolean>(true);

  const [orderHistory, setOrderHistory] = useState<DataHistory>({
    orderId: "",
    orderer: {
      fullName: "",
      phoneNumber: "",
      email: "",
    },
    flightDetails: {
      departure: {
        airportId: 0,
        airportName: "",
        dateTime: "",
        city: "",
        code: "",
      },
      arrival: {
        airportId: 0,
        airportName: "",
        dateTime: "",
        city: "",
        code: "",
      },
      airline: {
        name: "",
        iconUrl: "",
        airlineId: 0,
      },
      flightCode: "",
    },
    passengerDetails: {
      adult: [],
      child: [],
      infant: [],
      passengerTotal: 0,
    },
    priceDetails: {
      basePriceBreakdown: {
        adult: { passengerCount: 0, price: 0 },
        child: { passengerCount: 0, price: 0 },
        infant: { passengerCount: 0, price: 0 },
      },
      totalDicount: 0,
      tax: 0,
      total: 0,
    },
    paymentStatus: "",
    facility: [],
    luggage: 0,
    paymentTime: "",
    flightClass: "",
  });

  const [ticket, setTicket] = useState<{
    data: DataHistory;
    message: string;
    status: string;
  }>({
    data: {
      orderId: "",
      orderer: {
        fullName: "",
        phoneNumber: "",
        email: "",
      },
      flightDetails: {
        departure: {
          airportId: 0,
          airportName: "",
          dateTime: "",
          city: "",
          code: "",
        },
        arrival: {
          airportId: 0,
          airportName: "",
          dateTime: "",
          city: "",
          code: "",
        },
        airline: {
          name: "",
          iconUrl: "",
          airlineId: 0,
        },
        flightCode: "",
      },
      passengerDetails: {
        adult: [],
        child: [],
        infant: [],
        passengerTotal: 0,
      },
      priceDetails: {
        basePriceBreakdown: {
          adult: { passengerCount: 0, price: 0 },
          child: { passengerCount: 0, price: 0 },
          infant: { passengerCount: 0, price: 0 },
        },
        totalDicount: 0,
        tax: 0,
        total: 0,
      },
      paymentStatus: "",
      facility: [],
      luggage: 0,
      paymentTime: "",
      flightClass: "",
    },
    message: "",
    status: "",
  });

  const fetchOrderHistory = async () => {
    try {
      dispatch(setIsLoading(true));
      const response = await fetchInstance({
        method: "GET",
        endpoint: `/api/orders/details?orderId=${orderId}`,
        authToken: useUserToken(),
      });

      setOrderHistory(response.data);
      setTicket(response);
    } catch (error) {
      console.log("error");
    } finally {
      setLoading(false);
      dispatch(setIsLoading(false));
    }
  };

  function calculateTimeRange(startTime: string, endTime: string): string {
    const start = new Date(startTime);
    const end = new Date(endTime);
    const differenceInMilliseconds = Math.abs(end.getTime() - start.getTime());
    const hours = Math.floor(differenceInMilliseconds / (1000 * 60 * 60));
    const minutes = Math.floor((differenceInMilliseconds % (1000 * 60 * 60)) / (1000 * 60));

    return `${hours}j ${minutes}m`;
  }

  const timeFormatterForDetail = (time: string) => {
    const date = new Date(time);
    const formatter = new Intl.DateTimeFormat("id-ID", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
    const formatted = formatter.format(date);

    return formatted;
  };

  useEffect(() => {
    fetchOrderHistory();
  }, []);

  return {
    orderHistory,
    calculateTimeRange,
    getLoading,
    ticket,
    loading,
    timeFormatterForDetail,
  };
}

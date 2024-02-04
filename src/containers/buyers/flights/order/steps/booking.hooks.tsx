import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { BuyerFlightOrder, IFlightData, IFlightOrderRequestBody } from "../../flights.types";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../../config/redux/store";
import { setCurrentStep, setFlightOrderData } from "../../../../../config/redux/action";
import { IAlert } from "../../../../../lib/services/auth";

export default function useFlightOrder() {
  const [enabled, setEnabled] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [alert, setAlert] = useState<IAlert | null>(null);

  const flightOrderData = {
    ticketId: "9805",
    classId: 1,
    passengerDetails: {
      adult: 1,
      child: 2,
      infant: 1,
    },
  };

  const [flightData, setFlightData] = useState<IFlightData>({
    ticketId: flightOrderData.ticketId,
    classId: flightOrderData.classId,
    fullName: "",
    phoneNumber: "",
    email: "",
    call: "",
  });

  useEffect(() => {
    if (alert !== null) {
      const timeoutId = setTimeout(() => {
        setAlert(null);
      }, 2000);
      return () => clearTimeout(timeoutId);
    }
  }, [alert]);

  const dispatch = useDispatch<AppDispatch>();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFlightData({
      ...flightData,
      [name]: value,
    });
  };

  const handleSubmitFlightOrder = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    setAlert({
      type: "success",
      data: {},
      message: "Pesanan sedang diproses",
    });

    try {
      const orderer = {
        fullName: `${flightData.call} ${flightData.fullName}`,
        phoneNumber: flightData.phoneNumber,
        email: flightData.email,
      };

      const passengerDetails = {
        adult: Object.keys(flightData)
          .filter((key) => key.startsWith("fullName-"))
          .map((_key, index) => {
            const fullNameKey = `fullName-${index}`;
            const callKey = `call-${index}`;
            const fullNameValue =
              index === 0 && enabled ? flightData.fullName : flightData[fullNameKey];
            const callValue = index === 0 && enabled ? flightData.call : flightData[callKey];
            return `${callValue} ${fullNameValue}`;
          }),

        child: Object.keys(flightData)
          .filter((key) => key.startsWith("child-Name"))
          .map(
            (key) => `${flightData[key.replace("child-Name", "child-Call")]} ${flightData[key]}`
          ),

        infant: Object.keys(flightData)
          .filter((key) => key.startsWith("infant-Name"))
          .map(
            (key) => `${flightData[key.replace("infant-Name", "infant-Call")]} ${flightData[key]}`
          ),
      };

      const payload: IFlightOrderRequestBody = {
        ticketId: flightOrderData.ticketId,
        classId: flightOrderData.classId,
        orderer,
        passengerDetails,
      };

      const fetchResult = await BuyerFlightOrder(payload);

      if (fetchResult.status === "fail" || fetchResult.status === "error") {
        const errorMessages = Object.values(fetchResult.data).map((value) => value);

        throw new Error(errorMessages.join("\n"));
      }

      setAlert({
        type: "success",
        data: {},
        message: fetchResult.message,
      });

      dispatch(setFlightOrderData(fetchResult));

      setTimeout(() => {
        dispatch(setCurrentStep(2));
      }, 2000);
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        setAlert({
          type: "fail",
          data: { errorResponse: error.message },
        });
      }
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 0);
    }
  };

  return {
    flightOrderData,
    flightData,
    enabled,
    setEnabled,
    isLoading,
    handleChange,
    handleSubmitFlightOrder,
    alert,
  };
}

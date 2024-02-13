import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import {
  BuyerPaymentOrder,
  IFlightOrderResponseBody,
  IPaymentRequestBody,
} from "../../flights.types";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../config/redux/store";
// import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../../config/redux/store";
import {
  resetGetTicket,
  addNotificationOrderId,
  setCurrentStep,
} from "./../../../../../config/redux/action";
import { IAlert } from "../../../../../lib/services/auth";

interface UsePaymentOrderProps {
  dispatch: AppDispatch;
}

export default function usePaymentOrder({ dispatch }: UsePaymentOrderProps) {
  // const dispatch = useDispatch<AppDispatch>();
  const resultData: IFlightOrderResponseBody = useSelector(
    (state: RootState) => state.flightOrderReducer
  );

  dispatch(resetGetTicket());

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [alert, setAlert] = useState<IAlert | null>(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const notifications = useSelector((state: RootState) => state.notificationReducer);

  const [paymentData, setPaymentData] = useState<IPaymentRequestBody>({
    orderId: resultData.data.orderId,
    cardNumber: "",
    cardName: "",
    cvv: "",
    expiredDate: "",
    paymentMethod: "",
  });

  useEffect(() => {
    if (alert !== null && alert.type !== "process") {
      const timeoutId = setTimeout(() => {
        setAlert(null);
      }, 2000);
      return () => clearTimeout(timeoutId);
    }
  }, [alert]);

  const calculatePassengerDetails = (passengerType: "adult" | "child" | "infant") => {
    const priceDetails = resultData.data.priceDetails.basePriceBreakdown?.[passengerType] || [];
    const totalCount = priceDetails.passengerCount;
    const totalPrice = priceDetails.price;
    return { totalCount, totalPrice };
  };

  const adultDetails = calculatePassengerDetails("adult");
  const childDetails = calculatePassengerDetails("child");
  const infantDetails = calculatePassengerDetails("infant");

  const totalPassengersPrice =
    adultDetails.totalPrice + childDetails.totalPrice + infantDetails.totalPrice;
  const totalDiscount = resultData.data.priceDetails.totalDicount;
  const totalTax = resultData.data.priceDetails.tax;
  const grandTotal = resultData.data.priceDetails.total;

  function convertCreditCardDate(inputDate: string): string {
    const [month, year] = inputDate.split("/").map(Number);

    if (isNaN(month) || isNaN(year) || /^(0[1-9]|1[0-2])\/\d{2}$/.test(inputDate) === false) {
      throw new Error("Masa berlaku tidak valid!");
    }

    const startDate = new Date(
      `20${year}-${month < 10 && month > 0 ? "0" + month : month}-01T00:00:00.000Z`
    );
    const endDate = new Date(startDate);
    endDate.setUTCMonth(endDate.getUTCMonth() + 1);
    endDate.setUTCDate(0);
    const formattedDate = endDate.toISOString();
    return formattedDate;
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    let isValidInputDate = true;
    let errorMessage = "";

    if (name === "expiredDate") {
      try {
        convertCreditCardDate(value);
      } catch (error) {
        if (error instanceof Error) {
          isValidInputDate = false;
          errorMessage = error.message;
        }
      }
    }

    const updatedPaymentData = { ...paymentData, [name]: value };
    setPaymentData(updatedPaymentData);

    const anyEmptyValue = Object.values(updatedPaymentData).some((val) => val === "");
    setIsButtonDisabled(anyEmptyValue || !isValidInputDate);

    setErrorMessage(errorMessage);
  };

  const handleSubmitPayment = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    setAlert({
      type: "process",
      data: {},
      message: "Pembayaran sedang diproses",
    });

    try {
      const payload: IPaymentRequestBody = {
        orderId: resultData.data.orderId,
        cardNumber: paymentData.cardNumber,
        cardName: paymentData.cardName,
        expiredDate: convertCreditCardDate(paymentData.expiredDate),
        cvv: paymentData.cvv,
      };

      const fetchResult = await BuyerPaymentOrder(payload);

      if (fetchResult.status === "fail" || fetchResult.status === "error") {
        const errorMessages = Object.values(fetchResult.data).map((value) => value);

        throw new Error(errorMessages.join("\n"));
      }

      setAlert({
        type: "success",
        data: {},
        message: fetchResult.message,
      });

      dispatch(addNotificationOrderId());

      setTimeout(() => {
        dispatch(setCurrentStep(3));
      }, 1000);
    } catch (error) {
      // console.log(error);

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

  // useEffect(() => {
  //   localStorage.setItem("orderCount", notifications.orderCount.toString());
  // }, [notifications.orderCount]);

  useEffect(() => {
    if (notifications.orderCount !== undefined && notifications.orderCount !== null) {
      localStorage.setItem("orderCount", notifications.orderCount.toString());
    }
  }, [notifications.orderCount]);

  return {
    isLoading,
    paymentData,
    totalPassengersPrice,
    totalDiscount,
    totalTax,
    grandTotal,
    handleChange,
    handleSubmitPayment,
    adultDetails,
    childDetails,
    infantDetails,
    alert,
    isButtonDisabled,
    errorMessage,
    resultData,
    setPaymentData,
    convertCreditCardDate
  };
}

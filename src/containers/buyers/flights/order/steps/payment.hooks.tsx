import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import {
  BuyerPaymentOrder,
  IFlightOrderResponseBody,
  IPaymentRequestBody,
} from "../../flights.types";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../config/redux/store";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../../config/redux/store";
import { resetGetTicket, setCurrentStep } from "./../../../../../config/redux/action";
import { IAlert } from "../../../../../lib/services/auth";

export default function usePaymentOrder() {
  const dispatch = useDispatch<AppDispatch>();
  const resultData: IFlightOrderResponseBody = useSelector(
    (state: RootState) => state.flightOrderReducer
  );

  dispatch(resetGetTicket());

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [alert, setAlert] = useState<IAlert | null>(null);

  const [paymentData, setPaymentData] = useState<IPaymentRequestBody>({
    orderId: "",
    cardNumber: "",
    cardName: "",
    cvv: "",
    expiredDate: "",
  });

  useEffect(() => {
    if (alert !== null) {
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
      throw new Error("Format masa berlaku tidak valid. Silahkan gunakan MM/YY.");
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
    setPaymentData({ ...paymentData, [name]: value });
  };

  const handleSubmitPayment = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    setAlert({
      type: "success",
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

      setTimeout(() => {
        dispatch(setCurrentStep(3));
      }, 1000);
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
  };
}

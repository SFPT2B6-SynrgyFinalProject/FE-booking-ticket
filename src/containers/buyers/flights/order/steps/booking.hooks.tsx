/* eslint-disable react-hooks/exhaustive-deps */
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { BuyerFlightOrder, IFlightData, IFlightOrderRequestBody } from "../../flights.types";
// import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../../config/redux/store";
import { setCurrentStep, setFlightOrderData } from "../../../../../config/redux/action";
import { IAlert } from "../../../../../lib/services/auth";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../config/redux/store";
import { GetTicketType } from "../../../../../config/redux/reducer/getTicketReducer";

interface UseFlightOrderProps {
  dispatch: AppDispatch;
}

export default function useFlightOrder({ dispatch }: UseFlightOrderProps) {
  // const dispatch = useDispatch<AppDispatch>();
  const getTicketType: GetTicketType = useSelector((state: RootState) => state.getTicketReducer);

  const [enabled, setEnabled] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [alert, setAlert] = useState<IAlert | null>(null);
  const [disableBtn, setDisableBtn] = useState<boolean>(true);

  const profileData = useSelector((state: RootState) => state.userReducer);

  const [flightData, setFlightData] = useState<IFlightData>({
    ticketId: "",
    classId: "",
    fullName: profileData.fullName || "",
    phoneNumber: profileData.noHp || "",
    email: profileData.email ||"",
    call: profileData.gender === "Laki-laki" ? "Tuan":"Nyonya" || "",
  });

  const checkIfAnyValueIsEmpty = () => {
    if (
      !flightData[`fullName`] ||
      !flightData[`call`] ||
      !flightData[`phoneNumber`] ||
      !flightData[`email`]
    ) {
      return true;
    }

    for (let i = 0; i < getTicketType.passengerDetails.adult; i++) {
      if (!flightData[`fullName-${i}`] || !flightData[`call-${i}`]) {
        return true;
      }
    }

    for (let i = 0; i < getTicketType.passengerDetails.child; i++) {
      if (!flightData[`child-Name-${i}`] || !flightData[`child-Call-${i}`]) {
        return true;
      }
    }

    for (let i = 0; i < getTicketType.passengerDetails.infant; i++) {
      if (!flightData[`infant-Name-${i}`] || !flightData[`infant-Call-${i}`]) {
        return true;
      }
    }

    return false;
  };

  useEffect(() => {
    setDisableBtn(
      checkIfAnyValueIsEmpty() || getTicketType.ticketId === "" || getTicketType.ticketId === 0
    );

    if (alert !== null && alert.type !== "process") {
      const timeoutId = setTimeout(() => {
        setAlert(null);
      }, 2000);
      return () => clearTimeout(timeoutId);
    }
  }, [getTicketType.ticketId, flightData, getTicketType.passengerDetails, alert]);

  useEffect(() => {
    if (enabled) {
      setFlightData({
        ...flightData,
        ["fullName-0"]: flightData.fullName,
        ["call-0"]: flightData.call,
      });
    }
  }, [enabled]);

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
      type: "process",
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
        ticketId: getTicketType.ticketId,
        classId: getTicketType.classId,
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
    flightData,
    enabled,
    setEnabled,
    isLoading,
    handleChange,
    handleSubmitFlightOrder,
    alert,
    getTicketType,
    disableBtn,
    checkIfAnyValueIsEmpty,
  };
}

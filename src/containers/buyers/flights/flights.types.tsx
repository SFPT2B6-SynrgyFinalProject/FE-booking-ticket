import { useUserToken } from "../../../lib/services/userToken";
import { fetchInstance } from "../../../lib/services/core";

export interface ICurrentStep {
  currentStep: number;
}

export interface IPaymentRequestBody {
  orderId: string;
  cardNumber: string;
  cardName: string;
  cvv: string;
  expiredDate: string;
}

export interface IPaymentResponseBody {
  data: {
    orderId: string;
  };
  message: string;
  status: string;
}

export interface IFlightData {
  ticketId: string;
  classId: number;
  fullName: string;
  phoneNumber: string;
  email: string;
  call: string;
  [key: string]: string | number;
}

export interface IFlightOrderRequestBody {
  ticketId: string;
  classId: number;
  orderer: {
    fullName: string;
    phoneNumber: string;
    email: string;
  };
  passengerDetails: {
    adult: string[];
    child: string[];
    infant: string[];
  };
}

export interface IFlightOrderResponseBody {
  data: {
    orderId: string;
    orderer: {
      fullName: string;
      phoneNumber: string;
      email: string;
    };
    facility: Array<{ id: number; name: string }>;
    flightClass: string;
    flightDetails: {
      departure: {
        airportId: number;
        airportName: string;
        dateTime: string;
        city: string;
        code: string;
      };
      arrival: {
        airportId: number;
        airportName: string;
        dateTime: string;
        city: string;
        code: string;
      };
      airline: {
        name: string;
        iconUrl: string;
        airlineId: number;
      };
      flightCode: string;
    };
    passengerDetails: {
      adult?: string[];
      child?: string[];
      infant?: string[];
    };
    priceDetails: {
      basePriceBreakdown: {
        adult: {
          passengerCount: number;
          price: number;
        };
        child: {
          passengerCount: number;
          price: number;
        };
        infant: {
          passengerCount: number;
          price: number;
        };
      };
      totalDicount: number;
      tax: number;
      total: number;
    };
    paymentStatus: string;
  };
  message: string;
  status: string;
}

export async function BuyerFlightOrder(
  form: IFlightOrderRequestBody
): Promise<IFlightOrderResponseBody> {
  return await fetchInstance({
    endpoint: "/api/orders",
    method: "POST",
    authToken: useUserToken(),
    data: form,
  });
}

export async function BuyerPaymentOrder(form: IPaymentRequestBody): Promise<IPaymentResponseBody> {
  return await fetchInstance({
    endpoint: "/api/orders/payment",
    method: "POST",
    authToken: useUserToken(),
    data: form,
  });
}

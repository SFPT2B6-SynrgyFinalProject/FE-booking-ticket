import { fetchInstance } from "../../../lib/services/core";
import { useUserToken } from "../../../lib/services/userToken";

export interface ITransactions {
  data: any;
  number: number;
  orderId: string;
  paymentTotal: string;
  paymentMethod: string;
  transactionDate: string;
  status: string;
}
export interface ITransactionsDetail {
  data: any;
  orderId: string;
  orderer: {
    fullName: string;
    phoneNumber: string;
    email: string;
  };
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
    adult: string[];
    child: string[];
    infant: string[];
    passengerTotal: number;
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
  facility: {
    id: number;
    name: string;
  }[];
  luggage: number;
  paymentTime: string;
  flightClass: string;
  message: string;
  status: string;
}




export async function getTransactions(): Promise<ITransactions> {
  return await fetchInstance({
    endpoint: "/api/admin/transactions?dataPerPage=50&page=1",
    method: "GET",
    authToken: useUserToken(),
  });
}

export async function getTransactionDetail(orderId: string): Promise<ITransactionsDetail> {
  return await fetchInstance({
    endpoint: `/api/admin/transactions/details?orderId=${orderId}`,
    method: "GET",
    authToken: useUserToken(),
  });
}
import { PayloadAction } from "@reduxjs/toolkit";
import { IFlightOrderResponseBody } from "../../../containers/buyers/flights/flights.types";

const initialState: IFlightOrderResponseBody = {
  data: {
    orderId: "",
    orderer: {
      fullName: "",
      phoneNumber: "",
      email: "",
    },
    facility: [],
    flightClass: "",
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
    },
    priceDetails: {
      basePriceBreakdown: {
        adult: {
          passengerCount: 0,
          price: 0,
        },
        child: {
          passengerCount: 0,
          price: 0,
        },
        infant: {
          passengerCount: 0,
          price: 0,
        },
      },
      totalDicount: 0,
      tax: 0,
      total: 0,
    },
    paymentStatus: "",
  },
  message: "",
  status: "",
};

export const flightOrderReducer = (
  state = initialState,
  action: PayloadAction<IFlightOrderResponseBody>
) => {
  if (action.type === "GET_RESPONSE_API_FLIGHT_ORDER") {
    return {
      ...state,
      ...action.payload,
    };
  }
  return state;
};

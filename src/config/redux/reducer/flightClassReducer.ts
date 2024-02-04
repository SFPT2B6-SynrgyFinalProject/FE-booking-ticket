import { PayloadAction } from "@reduxjs/toolkit";
import { FlightClassType } from "../../../lib/services/flightClass";

const initialState: FlightClassType = {
  data: [],
  status: "",
};

export const flightClassReducer = (
  state = initialState,
  action: PayloadAction<FlightClassType>
) => {
  if (action.type === "GET_FLIGHT_CLASS") {
    return {
      ...state,
      ...action.payload,
    };
  }
  return state;
};

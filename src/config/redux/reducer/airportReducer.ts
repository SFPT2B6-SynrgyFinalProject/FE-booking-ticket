import { PayloadAction } from "@reduxjs/toolkit";
import { AirportType } from "../../../lib/services/airport";

const initialState: AirportType = {
  data: [],
  status: "",
};

export const airportReducer = (
  state = initialState,
  action: PayloadAction<AirportType>
) => {
  if (action.type === "GET_AIRPORT") {
    return {
      ...state,
      ...action.payload,
    };
  }
  return state;
};

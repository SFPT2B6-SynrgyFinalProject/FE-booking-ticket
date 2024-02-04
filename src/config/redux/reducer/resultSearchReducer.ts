import { PayloadAction } from "@reduxjs/toolkit";
import { SearchByUser } from "../../../lib/services/flightTicket";

const initialState: SearchByUser = {
  classId: 0,
  passenger: {
    adult: 0,
    infant: 0,
    child: 0
  },
  arrivalCode: "",
  departureCode: "",
  departureDateStart: "",
  departureDateEnd: "",
  airlineId: [],
  sortBy: [],
  page: 0,
  dataPerPage: 0
};

export const resultSearchReducer = (
  state = initialState,
  action: PayloadAction<SearchByUser>
) => {
  if (action.type === "RESULT_SEARCH") {
    return {
      ...state,
      ...action.payload,
    };
  }
  return state;
};

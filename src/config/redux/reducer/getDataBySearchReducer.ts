import { SearchResponse } from "../../../lib/services/flightTicket";
import { PayloadAction } from "@reduxjs/toolkit";

const initialState: SearchResponse = {
  data: {
    availableAirline: [],
    availableFlight: [],
    dataPerPage: 0,
    lastPage: 0,
    dataInPage: 0,
    currentPage: 0,
  },
  status: "",
};

export const getDataBySearchReducer = (
  state = initialState,
  action: PayloadAction<SearchResponse>
) => {
  if (action.type === "GET_DATA_BY_SEARCH") {
    return {
      ...state,
      ...action.payload,
    };
  }
  return state;
};

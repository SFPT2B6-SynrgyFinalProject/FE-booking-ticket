import { PayloadAction } from "@reduxjs/toolkit";

export interface GetTicketType {
  ticketId: number | string;
  classId: number | string;
  passengerDetails: {
    adult: number;
    child: number;
    infant: number;
  };
}

const initialState: GetTicketType = {
  ticketId: "",
  classId: 0,
  passengerDetails: {
    adult: 0,
    child: 0,
    infant: 0,
  },
};

export const getTicketReducer = (
  state = initialState,
  action: PayloadAction<GetTicketType>
) => {
  if (action.type === "GET_TICKET") {
    return {
      ...state,
      ...action.payload,
    };
  }
  return state;
};

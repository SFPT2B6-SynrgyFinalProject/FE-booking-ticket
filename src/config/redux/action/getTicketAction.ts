import { GetTicketType } from "../reducer/getTicketReducer";

export const setGetTicket = (payload: GetTicketType) => {
  return {
    type: "GET_TICKET",
    payload: payload,
  };
};

export const resetGetTicket = () => {
  return {
    type: "RESET_GET_TICKET",
  };
};
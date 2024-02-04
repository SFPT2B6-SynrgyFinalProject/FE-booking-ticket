import { GetTicketType } from "../reducer/getTicketReducer";

export const setGetTicket = (payload: GetTicketType) => {
  return {
    type: "GET_TICKET",
    payload: payload,
  };
};

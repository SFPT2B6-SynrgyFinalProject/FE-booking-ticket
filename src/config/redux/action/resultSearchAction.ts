import { SearchByUser } from "../../../lib/services/flightTicket";

export const setResultSearch = (payload: SearchByUser) => {
  return {
    type: "RESULT_SEARCH",
    payload,
  };
};

import { SearchResponse } from "../../../lib/services/flightTicket";

export const setDataBySearch = (payload: SearchResponse) => {
  return {
    type: "GET_DATA_BY_SEARCH",
    payload
  };
};

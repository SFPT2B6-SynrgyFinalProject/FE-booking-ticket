import { IFlightOrderResponseBody } from "../../../containers/buyers/flights/flights.types";

export const setFlightOrderData = (payload: IFlightOrderResponseBody) => {
  return {
    type: "GET_RESPONSE_API_FLIGHT_ORDER",
    payload: payload,
  };
};
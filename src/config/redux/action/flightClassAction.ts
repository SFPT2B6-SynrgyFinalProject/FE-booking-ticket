import { FlightClassType } from "../../../lib/services/flightClass";

export const setFlightClass = (payload: FlightClassType) => {
  return {
    type: "GET_FLIGHT_CLASS",
    payload: payload,
  };
};

import { AirportType } from "../../../lib/services/airport";

export const setAirport = (payload: AirportType) => {
  return {
    type: "GET_AIRPORT",
    payload: payload,
  };
};

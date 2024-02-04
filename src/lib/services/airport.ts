import { fetchInstance } from "./core";

export interface AirportType {
  data: {
    id: number;
    airportName: string;
    cityName: string;
    code: string;
  }[];
  status: string;
}

export async function getAirport(): Promise<AirportType> {
  return await fetchInstance({
    endpoint: "/api/flight/airport",
    method: "GET",
  });
}

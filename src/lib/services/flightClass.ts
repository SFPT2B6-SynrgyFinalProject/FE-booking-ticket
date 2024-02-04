import { fetchInstance } from "./core";

export interface FlightClassType {
  data: {
    id: number;
    name: string;
  }[];
  status: string;
}

export async function getFlightClass(): Promise<FlightClassType> {
  return await fetchInstance({
    endpoint: "/api/flight/class",
    method: "GET",
  });
}

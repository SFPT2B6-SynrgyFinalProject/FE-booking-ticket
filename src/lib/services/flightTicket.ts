import { fetchInstance } from "./core";

export interface SearchByUser {
  classId: number | string;
  passenger: {
    adult: number;
    child: number;
    infant: number;
  };
  arrivalCode: string | number;
  departureCode: string | number;
  departureDateStart: string;
  departureDateEnd: string;
  arrivalDateStart?: string;
  arrivalDateEnd?: string;
  airlineId: number[];
  sortBy: string[];
  page: number;
  dataPerPage: number;
}

interface Airline {
  airlineId: number;
  airlineName: string;
  iconUrl: string;
}

interface DetailsDepartureOrArrival {
  airportId: number;
  airportName: string;
  dateTime: string;
}

interface Facility {
  id: number;
  name: string;
}

interface PassengerBreakdown {
  passengerCount: number;
  price: number;
}

interface PriceBreakdown {
  adult: PassengerBreakdown;
  child: PassengerBreakdown;
  infant: PassengerBreakdown;
}

interface PriceDetails {
  basePriceBreakdown: PriceBreakdown;
  totalDicount: number;
  tax: number;
  total: number;
}

interface AvailableFlight {
  ticketId: number;
  departureAirportCode: string;
  arrivalAirportCode: string;
  departureDateTime: string;
  arrivalDateTime: string;
  durationInMin: number;
  airline: {
    name: string;
    iconUrl: string;
    airlineId: number;
  };
  basePricePerPerson: number;
  discountedPricePerPerson: number;
  luggage: number;
  ticketDetails: {
    departure: DetailsDepartureOrArrival;
    arrival: DetailsDepartureOrArrival;
    facility: Facility[];
    durationInMin: number;
    priceDetails: PriceDetails;
  };
  withFood: boolean;
  withLuggage: boolean;
}

export interface SearchResponse {
  data: {
    availableAirline: Airline[];
    availableFlight: AvailableFlight[];
    dataPerPage: number;
    lastPage: number;
    dataInPage: number;
    currentPage: number;
  };
  status: string;
}

export async function getFlightTicket(
  form: SearchByUser
): Promise<SearchResponse> {
  return await fetchInstance({
    endpoint: "/api/flight/ticket",
    method: "POST",
    data: form,
  });
}

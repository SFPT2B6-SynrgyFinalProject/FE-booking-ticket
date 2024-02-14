export interface IOrdersData {
  departure: Departure;
  arrival: Arrival;
  airline: Airline;
  flightCode: string;
  orderId: string;
  paymentStatus: string;
  totalPassengers: number;
}

export interface Departure {
  airportId: number;
  airportName: string;
  dateTime: string;
  city: string;
}

export interface Arrival {
  airportId: number;
  airportName: string;
  dateTime: string;
  city: string;
}

export interface Airline {
  name: string;
  iconUrl: string;
  airlineId: number;
}

export interface IOrderHistory {
  orderId: string;
}

export interface DataHistory {
  orderId: string;
  orderer: Orderer;
  flightDetails: FlightDetails;
  passengerDetails: PassengerDetails;
  priceDetails: PriceDetails;
  paymentStatus: string;
  facility: Facility[];
  luggage: number;
  paymentTime: string;
  flightClass: string;
}

export interface Orderer {
  fullName: string;
  phoneNumber: string;
  email: string;
}

export interface FlightDetails {
  departure: Departure;
  arrival: Arrival;
  airline: Airline;
  flightCode: string;
}

export interface Departure {
  airportId: number;
  airportName: string;
  dateTime: string;
  city: string;
  code: string;
}

export interface Arrival {
  airportId: number;
  airportName: string;
  dateTime: string;
  city: string;
  code: string;
}

export interface Airline {
  name: string;
  iconUrl: string;
  airlineId: number;
}

export interface PassengerDetails {
  adult: string[];
  child: any[];
  infant: any[];
  passengerTotal: number;
}

export interface PriceDetails {
  basePriceBreakdown: BasePriceBreakdown;
  totalDicount: number;
  tax: number;
  total: number;
}

export interface BasePriceBreakdown {
  adult: Adult;
  child: Child;
  infant: Infant;
}

export interface Adult {
  passengerCount: number;
  price: number;
}

export interface Child {
  passengerCount: number;
  price: number;
}

export interface Infant {
  passengerCount: number;
  price: number;
}

export interface Facility {
  id: number;
  name: string;
}

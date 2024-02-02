export interface IOrders {
  departure: Departure;
  arrival: Arrival;
  airline: Airline;
  flightCode: string;
  orderId: string;
  paymentStatus: string;
  totalPassengers: number;
}
// export interface Root {
//   data: Data;
//   message: string;
//   status: string;
// }

// export interface Data {
//   orders: Order[];
// }

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

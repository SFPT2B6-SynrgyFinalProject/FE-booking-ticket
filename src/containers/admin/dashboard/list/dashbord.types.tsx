export interface ContentCardType {
  bgColor: string;
  txtColor: string;
  icon: string;
  title: string;
  body: string;
}

export interface PopularAirlineType {
  airlines: {
    number: number;
    name: string;
    code: string;
  }[];
}

export interface BodyOfCardType {
  iconName: string;
  title: string;
  body: any;
  bgColor: string;
  txtColor: string;
}

export interface UserActive {
  data: {
    lastPage: number;
    dataInPage: number;
  };
}

export interface Order {
  data: {
    lastPage: number;
    dataInPage: number;
    orders: DetailOrder[];
  };
}

export interface DetailOrder {
  number: number;
  orderId: string;
  fullName: string;
  airline: string;
  transactionDate: string;
  status: string;
  priceTotal: number;
  flightDestination: string;
}

export interface Transaction {
  data: {
    lastPage: number;
    dataInPage: number;
    transactions: DetailTransaction[];
  };
}

export interface DetailTransaction {
  orderId: string;
  transactionDate: string;
  status: string;
  paymentTotal: string;
}

export interface dayTransaction {
  detailTransaction: DetailOrder[];
  day: string;
  isLoading: boolean;
}

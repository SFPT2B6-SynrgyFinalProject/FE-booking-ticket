import { fetchInstance } from "../../../lib/services/core";
import { useUserToken } from "../../../lib/services/userToken";

export interface ITransactions {
  data: any;
  number: number;
  orderId: string;
  paymentTotal: string;
  paymentMethod: string;
  transactionDate: string;
  status: string;
}

export async function getTransactions(): Promise<ITransactions> {
  return await fetchInstance({
    endpoint: "/api/admin/transactions?dataPerPage=5&page=1",
    method: "GET",
    authToken: useUserToken(),
  });
}

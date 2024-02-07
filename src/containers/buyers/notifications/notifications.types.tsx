import { fetchInstance } from "../../../lib/services/core";
import { useUserToken } from "../../../lib/services/userToken";

export interface INotifications {
  data: any;
  id: number,
  content: string,
  title: string,
  createdDatetime: string,
  imageUrl: string
}

export async function getNotifications(): Promise<INotifications> {
  return await fetchInstance({
    endpoint: "/api/notifications",
    method: "GET",
    authToken: useUserToken(),
  });
}

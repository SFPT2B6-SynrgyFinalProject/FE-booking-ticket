import { fetchInstance } from "../../../lib/services/core";
import { useUserToken } from "../../../lib/services/auth";


export interface IAirports {
    id: number;
    airportName: string;
    cityName: number|string;
    code: string;
  }
  export type AirportsResponseBody =
  {
    data: {
      airports:[]
    },
    message: string,
    status: string,
  }
export async function getAirports(): Promise<AirportsResponseBody> {
  return await fetchInstance({
    endpoint: "/api/admin/airports?dataPerPage=50&page=1",
    method: "GET",
    authToken: useUserToken()
  })
}
  export async function editAirport(form: IAirports): Promise<AirportsResponseBody> {
    return await fetchInstance({
      endpoint: "/api/admin/airports",
      method: "PUT",
      authToken: useUserToken(),
      data : form
    })
}
export async function addAirport(form: IAirports): Promise<AirportsResponseBody> {
    return await fetchInstance({
      endpoint: "/api/admin/airports",
      method: "POST",
      authToken: useUserToken(),
      data : form
    })
}


  
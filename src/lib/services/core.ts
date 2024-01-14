export type FetchOption = {
  method: "GET" | "POST" | "PUT" | "DELETE";
  endpoint: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
};
const API_URL: string = import.meta.env.VITE_API_URL;

export async function fetchInstance({ method, endpoint, data }: FetchOption) {
  const response = await fetch(API_URL + endpoint, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    ...(data && {
      body: JSON.stringify(data),
    }),
  });

  return response.json();
}

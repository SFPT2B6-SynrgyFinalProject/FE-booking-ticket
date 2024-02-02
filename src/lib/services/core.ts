export type FetchOption = {
  method: "GET" | "POST" | "PUT" | "DELETE";
  endpoint: string;
  data?: any;
  authToken?: string;
};
const API_URL: string = import.meta.env.VITE_API_URL;

export async function fetchInstance({
  method,
  endpoint,
  data,
  authToken,
}: FetchOption) {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (authToken) {
    headers["Authorization"] = `Bearer ${authToken}`;
  }
  const response = await fetch(API_URL + endpoint, {
    method: method,
    headers: headers,
    ...(data && {
      body: JSON.stringify(data),
    }),
  });

  return response.json();
}

export function useUserToken() {
  return localStorage.getItem("user_access_token") as string;
}
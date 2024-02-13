import { useUserToken } from "./userToken";

const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => (store[key] = value.toString()),
    removeItem: (key: string) => delete store[key],
    clear: () => (store = {}),
  };
})();

// Mock localStorage sebelum setiap tes
beforeEach(() => {
  Object.defineProperty(window, "localStorage", {
    value: localStorageMock,
  });
});

describe("useUserToken", () => {
  test("returns the user access token from localStorage", () => {
    const accessToken = "mock-access-token";
    localStorage.setItem("user_access_token", accessToken);

    // Panggil fungsi yang diuji
    const result = useUserToken();

    // Periksa apakah nilai yang dikembalikan sesuai dengan yang diharapkan
    expect(result).toBe(accessToken);
  });

  test("returns null if user access token is not set in localStorage", () => {
    localStorage.removeItem("user_access_token");

    // Panggil fungsi yang diuji
    const result = useUserToken();

    // Periksa apakah nilai yang dikembalikan adalah null
    expect(result).toBeNull();
  });
});

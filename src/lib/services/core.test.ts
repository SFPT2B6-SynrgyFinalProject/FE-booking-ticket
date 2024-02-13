import { fetchInstance, FetchOption } from "./core";

describe("fetchInstance", () => {
  let originalFetch: any;

  beforeEach(() => {
    originalFetch = global.fetch;
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  test("should call fetch with correct parameters and return data", async () => {
    const mockData = { message: "Data received successfully" };
    const mockResponse = {
      json: jest.fn().mockResolvedValueOnce(mockData),
    };
    const mockFetch = jest.fn().mockResolvedValueOnce(mockResponse);

    global.fetch = mockFetch;

    const fetchOption: FetchOption = {
      method: "GET",
      endpoint: "/example",
    };

    const result = await fetchInstance(fetchOption);

    expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining("/example"), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    expect(result).toEqual(mockData);
  });

  test("should call fetch with authToken in headers if provided", async () => {
    const mockData = { message: "Data received successfully" };
    const mockResponse = {
      json: jest.fn().mockResolvedValueOnce(mockData),
    };
    const mockFetch = jest.fn().mockResolvedValueOnce(mockResponse);

    global.fetch = mockFetch;

    const fetchOption: FetchOption = {
      method: "GET",
      endpoint: "/example",
      authToken: "exampleAuthToken",
    };

    await fetchInstance(fetchOption);

    expect(mockFetch).toHaveBeenCalledWith(expect.anything(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer exampleAuthToken",
      },
    });
  });

  test("should handle request with data properly", async () => {
    const mockData = { message: "Data received successfully" };
    const mockResponse = {
      json: jest.fn().mockResolvedValueOnce(mockData),
    };
    const mockFetch = jest.fn().mockResolvedValueOnce(mockResponse);

    global.fetch = mockFetch;

    const postData = { name: "John Doe", email: "john@example.com" };
    const fetchOption: FetchOption = {
      method: "POST",
      endpoint: "/example",
      data: postData,
    };

    await fetchInstance(fetchOption);

    expect(mockFetch).toHaveBeenCalledWith(expect.anything(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });
  });

  test("should handle request errors", async () => {
    const error = new Error("Request failed");
    const mockFetch = jest.fn().mockRejectedValueOnce(error);

    global.fetch = mockFetch;

    const fetchOption: FetchOption = {
      method: "GET",
      endpoint: "/example",
    };

    await expect(fetchInstance(fetchOption)).rejects.toThrow("Request failed");
  });
});

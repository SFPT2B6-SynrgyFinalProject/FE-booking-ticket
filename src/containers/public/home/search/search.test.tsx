import useSearch from "./search.hooks";
import { useSelector } from "react-redux";

const mockUseSelector = useSelector as jest.MockedFunction<typeof useSelector>;

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
}));

describe("useSearch", () => {
  it("returns the correct search data", () => {
    // Mock the useSelector to return specific values
    mockUseSelector.mockReturnValueOnce({
      departureCode: "D1",
      arrivalCode: "A1",
      classId: "Economy",
      departureDateStart: "2024-02-05",
      departureDateEnd: "2024-02-10",
      passenger: 2,
    });
    mockUseSelector.mockReturnValueOnce({
      data: [
        { code: "D1", cityName: "DepartureCity" },
        { code: "A1", cityName: "ArrivalCity" },
      ],
    });

    const result = useSearch();

    // Assert that the result matches the expected output
    expect(result).toEqual([
      {
        from: "DepartureCity",
        to: "ArrivalCity",
        class: "Economy",
        depatureDate: "05-02-2024",
        depatureArrival: "10-02-2024",
        person: 2,
      },
    ]);
  });
});

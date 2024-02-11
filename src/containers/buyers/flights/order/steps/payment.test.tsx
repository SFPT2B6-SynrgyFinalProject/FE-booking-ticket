import { cleanup, render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../../../../config/redux/store";
import { Payment } from "./payment";
import { useSelector } from "react-redux";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
}));

const mockUseSelector = useSelector as jest.MockedFunction<typeof useSelector>;
afterEach(() => {
  jest.clearAllMocks();
  cleanup();
});

test("resultData is set correctly using useSelector", () => {
  const mockResultData = {
    data: {
      orderId: "123456",
      orderer: {
        fullName: "John Doe",
        phoneNumber: "1234567890",
        email: "john.doe@example.com",
      },
      facility: [],
      flightClass: "Ekonomi",
      flightDetails: {
        departure: {
          airportId: 1,
          airportName: "Airport",
          dateTime: "2024-02-11T12:00:00Z",
          city: "City",
          code: "CODE",
        },
        arrival: {
          airportId: 2,
          airportName: "Airport 2",
          dateTime: "2024-02-11T14:00:00Z",
          city: "City 2",
          code: "CODE2",
        },
        airline: {
          name: "Airline",
          iconUrl: "airline-icon.png",
          airlineId: 123,
        },
        flightCode: "FLIGHT123",
      },
      passengerDetails: {
        adult: ["John Doe", "Jane Doe"],
        child: [],
        infant: [],
        passengerTotal: 2,
      },
      priceDetails: {
        basePriceBreakdown: {
          adult: {
            passengerCount: 2,
            price: 200,
          },
          child: {
            passengerCount: 0,
            price: 0,
          },
          infant: {
            passengerCount: 0,
            price: 0,
          },
        },
        totalDicount: 0,
        tax: 20,
        total: 220,
      },
      paymentStatus: "unpaid",
    },
    message: "Success",
    status: "success",
  };

  mockUseSelector.mockReturnValue(mockResultData);

  render(
    <Provider store={store}>
      <Payment />
    </Provider>
  );

  expect(mockUseSelector).toHaveBeenCalled();
  expect(mockUseSelector).toHaveBeenCalledWith(expect.any(Function));
  expect(mockUseSelector.mock.results[0].value).toEqual(mockResultData);
});

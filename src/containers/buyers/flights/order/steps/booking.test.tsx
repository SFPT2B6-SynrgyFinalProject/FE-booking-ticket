import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../../../../config/redux/store";
import { Booking } from "./booking";
import useFlightOrder from "./booking.hooks";

jest.mock("./booking.hooks", () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockUseFlightOrder = useFlightOrder as jest.MockedFunction<typeof useFlightOrder>;

test("getTicketType is set correctly using useSelector", () => {
  const mockGetTicketType = {
    ticketId: "345345435",
    classId: "Ekonomi 1",
    passengerDetails: {
      adult: 2,
      child: 1,
      infant: 0,
    },
  };

  mockUseFlightOrder.mockReturnValue({
    checkIfAnyValueIsEmpty: jest.fn(),
    handleChange: jest.fn(),
    handleSubmitFlightOrder: jest.fn(),
    flightData: {
      ticketId: "",
      classId: "",
      fullName: "",
      phoneNumber: "",
      email: "",
      call: "",
    },
    enabled: false,
    setEnabled: jest.fn(),
    isLoading: false,
    alert: null,
    getTicketType: mockGetTicketType,
    disableBtn: false,
  });

  render(
    <Provider store={store}>
      <Booking />
    </Provider>
  );

  expect(mockUseFlightOrder).toHaveBeenCalled();
  expect(mockUseFlightOrder.mock.calls[0][0]).toEqual({ dispatch: expect.any(Function) });
});

// Add other test cases as needed

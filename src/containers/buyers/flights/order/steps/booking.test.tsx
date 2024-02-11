import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../../../../config/redux/store";
import { Booking } from "./booking";
import { useSelector } from "react-redux";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
}));

const mockUseSelector = useSelector as jest.MockedFunction<typeof useSelector>;

test("getTicketType is set correctly using useSelector", () => {
  const mockGetTicketType = {
    ticketId: "1982",
    classId: "Ekonomi",
    passengerDetails: {
      adult: 2,
      child: 1,
      infant: 0,
    },
  };

  mockUseSelector.mockReturnValue(mockGetTicketType);

  render(
    <Provider store={store}>
      <Booking />
    </Provider>
  );

  expect(mockUseSelector).toHaveBeenCalled();
  expect(mockUseSelector).toHaveBeenCalledWith(expect.any(Function));
  expect(mockUseSelector.mock.results[0].value).toEqual(mockGetTicketType);
});

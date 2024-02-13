import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../../../../config/redux/store";
import usePaymentOrder from "./payment.hooks";
import { BuyerPaymentOrder } from "./../../flights.types";
import { FormEvent } from "react";

jest.mock("./../../flights.types");

describe("usePaymentOrder", () => {
  test("handleSubmitPayment function submits payment successfully", async () => {
    const mockDispatch = jest.fn();
    const mockBuyerPaymentOrder = BuyerPaymentOrder as jest.MockedFunction<
      typeof BuyerPaymentOrder
    >;
    const mockFetchResult = {
      status: "success",
      data: {
        orderId: "mockOrderId",
      },
      message: "Payment successful",
    };
    mockBuyerPaymentOrder.mockResolvedValueOnce(mockFetchResult);

    const TestComponent = () => {
      const { handleSubmitPayment, setPaymentData, isLoading, alert, convertCreditCardDate } =
        usePaymentOrder({
          dispatch: mockDispatch,
        });

      const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formattedDate = convertCreditCardDate("05/24");
        expect(formattedDate).toBe("2024-05-31T00:00:00.000Z");
        expect(() => convertCreditCardDate("valid"));

        const paymentData = {
          orderId: "mockOrderId",
          cardNumber: "1234567890123456",
          cardName: "John Doe",
          cvv: "123",
          expiredDate: "05/28",
        };
        setPaymentData(paymentData);
        await handleSubmitPayment(e);
      };

      return (
        <form onSubmit={handleSubmit}>
          <div>{isLoading ? "Loading..." : null}</div>
          <div>{alert && alert.message}</div>
          <button type="submit">Submit Payment</button>
        </form>
      );
    };

    const { getByText } = render(
      <Provider store={store}>
        <TestComponent />
      </Provider>
    );

    expect(getByText("Submit Payment")).toBeInTheDocument;
    fireEvent.click(getByText("Submit Payment"));
    expect(getByText("Loading...")).toBeInTheDocument;
    expect(mockDispatch).toHaveBeenCalledTimes(2);
  });
});

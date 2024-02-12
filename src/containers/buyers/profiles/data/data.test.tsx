import useData from "./data.hooks";
import { useSelector } from "react-redux";

const mockUseSelector = useSelector as jest.MockedFunction<typeof useSelector>;

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
}));

describe("useData", () => {
  it("returns the correct search data", () => {
    // Mock the useSelector to return specific values
    mockUseSelector.mockReturnValueOnce({
        fullName: "Agung Fhajar Fadilah",
        email: "fhajaragung89@gmail.com",
        birthDate: new Date("1999-01-02"),
        gender: "Laki-Laki",
        noHp: "089520018514",
        
    });
    const result = useData();

    // Assert that the result matches the expected output
    expect(result.handleSubmit).toEqual([
      {
        fullName: "Agung Fhajar Fadilah",
        email: "fhajaragung89@gmail.com",
        birthDate: new Date("1999-01-02"),
        gender: "Laki-Laki",
        noHp: "089520018514"
      },
    ]);
  });
});

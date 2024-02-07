import InputComponent from "../../../../../components/Input";
import { Card } from "../../../../../components/Card";
import useAction from "./payment.hooks";
import { rupiahFormatter } from "../../../../../lib/rupiahFormatter";
import Button from "../../../../../components/Button";
import Alert from "../../../../../components/Alert";

export const Payment = () => {
  const {
    isLoading,
    paymentData,
    totalPassengersPrice,
    totalDiscount,
    totalTax,
    grandTotal,
    handleChange,
    handleSubmitPayment,
    adultDetails,
    childDetails,
    infantDetails,
    alert,
    isButtonDisabled,
  } = useAction();

  return (
    <>
      {alert && (
        <div>
          {alert.type === "success" && (
            <Alert message={alert.message} type="success" customStyle="fixed" />
          )}
          {alert.type === "fail" && (
            <Alert message={Object.values(alert.data).join("\n")} type="fail" customStyle="fixed" />
          )}
        </div>
      )}
      <form onSubmit={handleSubmitPayment}>
        <Card title="Metode Pembayaran" customStyle="lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-40">
            <div className="mb-5 lg:mb-0">
              <div className="flex items-center mb-7">
                <div className="flex items-center mr-10">
                  <input
                    type="radio"
                    name="paymentMethod"
                    id="creditCard"
                    className="w-5 h-5"
                    onChange={handleChange}
                    value={"creditCard"}
                    required
                  />
                  <label htmlFor="creditCard" className="ml-3 text-lg text-gray-800 select-none">
                    Kartu Kredit
                  </label>
                </div>

                <div className="flex items-center mr-10">
                  <input
                    type="radio"
                    name="paymentMethod"
                    id="debit"
                    className="w-5 h-5"
                    onChange={handleChange}
                    value={"debit"}
                    required
                  />
                  <label htmlFor="debit" className="ml-3 text-lg text-gray-800 select-none">
                    Debit
                  </label>
                </div>
              </div>
              <div className="flex flex-col mb-7">
                <InputComponent
                  type="number"
                  id="cardNumber"
                  name="cardNumber"
                  customStyle={`py-[16px] pl-[20px] pr-[20px]`}
                  onChange={handleChange}
                  value={paymentData["cardNumber"] || ""}
                  placeholder="Nomor Kartu Kredit"
                  required
                />
              </div>

              <div className="flex flex-col mb-7">
                <InputComponent
                  type="text"
                  id="cardName"
                  name="cardName"
                  customStyle={`py-[16px] pl-[20px] pr-[20px]`}
                  onChange={handleChange}
                  value={paymentData["cardName"] || ""}
                  placeholder="Nama yang Tertera di Kartu Kredit"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-x-10">
                <div className="flex flex-col mb-7">
                  <InputComponent
                    type="text"
                    id="expiredDate"
                    name="expiredDate"
                    customStyle={`py-[16px] pl-[20px] pr-[20px]`}
                    onChange={handleChange}
                    value={paymentData["expiredDate"] || ""}
                    placeholder="Masa Berlaku: MM/YY"
                    required
                  />
                </div>
                <div className="flex flex-col mb-7">
                  <InputComponent
                    type="number"
                    id="cvv"
                    name="cvv"
                    customStyle={`py-[16px] pl-[20px] pr-[20px]`}
                    onChange={handleChange}
                    value={paymentData["cvv"] || ""}
                    placeholder="CVV: 3-4 digit kode"
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="mb-8 text-xl font-semibold text-black">Rincian Harga</h3>
              <div className="grid grid-cols-2 gap-x-20">
                <div className="grid grid-flow-row gap-y-3 sm:gap-y-8">
                  <span className="font-medium text-gray-600">
                    Harga Dewasa (x{adultDetails.totalCount})
                  </span>
                  {childDetails.totalCount === 0 ? (
                    ""
                  ) : (
                    <span className="font-medium text-gray-600">
                      Harga Anak (x{childDetails.totalCount})
                    </span>
                  )}
                  {infantDetails.totalCount === 0 ? (
                    ""
                  ) : (
                    <span className="font-medium text-gray-600">
                      Harga Bayi (x{infantDetails.totalCount})
                    </span>
                  )}
                  <span className="font-medium text-gray-600">Subtotal</span>
                  <span className="font-medium text-gray-600">Diskon</span>
                  <span className="font-medium text-gray-600">Pajak</span>
                  <span className="font-semibold">Total Bayar</span>
                </div>

                <div className="flex flex-col items-end justify-between">
                  <span className="font-medium text-gray-600">
                    {rupiahFormatter(adultDetails.totalPrice)}
                  </span>
                  {childDetails.totalCount === 0 ? (
                    ""
                  ) : (
                    <span className="font-medium text-gray-600">
                      {rupiahFormatter(childDetails.totalPrice)}
                    </span>
                  )}
                  {infantDetails.totalCount === 0 ? (
                    ""
                  ) : (
                    <span className="font-medium text-gray-600">
                      {rupiahFormatter(infantDetails.totalPrice)}
                    </span>
                  )}
                  <span className="font-medium text-gray-600">
                    {rupiahFormatter(totalPassengersPrice)}
                  </span>
                  <span className="font-medium text-gray-600">
                    -{rupiahFormatter(totalDiscount)}
                  </span>
                  <span className="font-medium text-gray-600">{rupiahFormatter(totalTax)}</span>
                  <span className="font-semibold text-blue-600">{rupiahFormatter(grandTotal)}</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <div className="flex flex-col md:w-3/6 lg:w-2/6 pb-10 mx-auto mt-16 md:mt-28 gap-y-4">
          <Button
            type="primary-dark"
            width="full"
            color="primary-dark"
            disabled={isButtonDisabled || isLoading}
          >
            {isLoading ? "Loading ..." : "Lanjutkan Pembayaran"}
          </Button>
        </div>
      </form>
    </>
  );
};

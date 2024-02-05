// import { StepperControl } from "./stepperControl";
import { Switch } from "@headlessui/react";
import InputComponent from "../../../../../components/Input";
import { Card } from "../../../../../components/Card";
import { InputRadioComponent } from "../../../../../components/InputRadio";
import useAction from "./booking.hooks";
import Alert from "../../../../../components/Alert";
import Button from "../../../../../components/Button";

export const Booking = () => {
  const {
    flightData,
    enabled,
    setEnabled,
    isLoading,
    handleChange,
    handleSubmitFlightOrder,
    alert,
    getTicketType
  } = useAction();

  const { passengerDetails } = getTicketType;

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

      <form onSubmit={handleSubmitFlightOrder}>
        <Card title="Detail Pemesan" customStyle="md:pt-10">
          <div className="grid grid-cols-1 gap-x-0 lg:grid-cols-2 lg:gap-x-20">
            <div className="flex flex-col mb-7">
              <InputComponent
                type="text"
                id="fullName"
                name="fullName"
                customStyle={`py-[16px] pl-[20px] pr-[20px]`}
                onChange={handleChange}
                value={flightData.fullName || ""}
                placeholder="Nama Lengkap"
                required
              />
            </div>

            <div className="flex items-center mb-7">
              <div className="flex items-center mr-3 sm:mr-10">
                <InputRadioComponent
                  id="Tuan"
                  name="call"
                  checked={flightData.call === "Tuan"}
                  onChange={handleChange}
                  value="Tuan"
                  label="Tuan"
                  required
                />
              </div>

              <div className="flex items-center mr-3 sm:mr-10">
                <InputRadioComponent
                  id="Nyonya"
                  name="call"
                  checked={flightData.call === "Nyonya"}
                  onChange={handleChange}
                  value="Nyonya"
                  label="Nyonya"
                  required
                />
              </div>

              <div className="flex items-center">
                <InputRadioComponent
                  id="Nona"
                  name="call"
                  checked={flightData.call === "Nona"}
                  onChange={handleChange}
                  value="Nona"
                  label="Nona"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col mb-7">
              <InputComponent
                type="number"
                id="phoneNumber"
                name="phoneNumber"
                customStyle={`py-[16px] pl-[20px] pr-[20px]`}
                onChange={handleChange}
                value={flightData["phoneNumber"] || ""}
                placeholder="Nomor Telepon"
                required
              />
            </div>

            <div className="flex flex-col mb-7">
              <InputComponent
                type="email"
                id="email"
                name="email"
                customStyle={`py-[16px] pl-[20px] pr-[20px]`}
                onChange={handleChange}
                value={flightData["email"] || ""}
                placeholder="Alamat E-mail"
                required
              />
            </div>
          </div>
        </Card>

        <Card title="Detail Penumpang" customStyle={`${passengerDetails.adult !== 0 ? "block":"hidden"} mt-14 md:pt-10`}>
          <div>
            {passengerDetails.adult !== 0 ? (
                <h1 className="mt-4 mb-6 text-xl font-semibold text-black">
                 Penumpang {passengerDetails.adult} (Dewasa)
                </h1>
            ) : (
              ""
            )}
            
            {[...Array(passengerDetails.adult)].map((_, index) => (
              <div
                key={index}
                className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-20 lg:items-start"
              >
                <div className="flex flex-col mb-5">
                  <InputComponent
                    type="text"
                    id={`fullName-${index}`}
                    name={`fullName-${index}`}
                    customStyle={`py-[16px] pl-[20px] pr-[20px]`}
                    onChange={handleChange}
                    value={
                      enabled && `fullName-${index}` === "fullName-0"
                        ? flightData[`fullName`]
                        : flightData[`fullName-${index}`] || ""
                    }
                    placeholder="Nama Lengkap"
                    disabled={enabled && `fullName-${index}` === "fullName-0" ? true : false}
                    required
                  />
                  <span className="mt-3 ml-1 text-sm text-gray-500">
                    Isi sesuai KTP/Paspor/SIM (tanpa tanda baca dan gelar)
                  </span>
                </div>

                {index === 0 ? (
                  <>
                    <div className="flex flex-col items-start xl:ml-32 relative justify-start mb-7">
                      <Switch.Group>
                        <Switch.Label
                          passive
                          as="div"
                          className="absolute right-0 left-16 lg:right-32 text-md text-gray-800"
                        >
                          Sama dengan pemesan
                        </Switch.Label>
                        <Switch
                          checked={enabled}
                          onChange={setEnabled}
                          className={`${
                            enabled ? "bg-blue-600" : "bg-gray-200"
                          } relative inline-flex h-6 w-11 items-center rounded-full`}
                        >
                          <span
                            className={`${
                              enabled ? "translate-x-6" : "translate-x-1"
                            } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                          />
                        </Switch>
                      </Switch.Group>
                    </div>
                  </>
                ) : (
                  ""
                )}

                <div className={`flex items-center ${index === 0 ? "" : "lg:pt-3"} mb-7 md:pl-1`}>
                  <div className="flex items-center mr-3 sm:mr-10">
                    <InputRadioComponent
                      id={`Tuan-${index}`}
                      name={`call-${index}`}
                      onChange={handleChange}
                      value="Tuan"
                      checked={
                        enabled && `call-${index}` === "call-0"
                          ? flightData["call"] === `Tuan`
                          : flightData[`call-${index}`] === `Tuan`
                      }
                      label="Tuan"
                      required
                    />
                  </div>

                  <div className="flex items-center mr-3 sm:mr-10">
                    <InputRadioComponent
                      id={`Nyonya-${index}`}
                      name={`call-${index}`}
                      onChange={handleChange}
                      value="Nyonya"
                      checked={
                        enabled && `call-${index}` === "call-0"
                          ? flightData["call"] === `Nyonya`
                          : flightData[`call-${index}`] === `Nyonya`
                      }
                      label="Nyonya"
                      required
                    />
                  </div>

                  <div className="flex items-center">
                    <InputRadioComponent
                      id={`Nona-${index}`}
                      name={`call-${index}`}
                      onChange={handleChange}
                      value="Nona"
                      checked={
                        enabled && `call-${index}` === "call-0"
                          ? flightData["call"] === `Nona`
                          : flightData[`call-${index}`] === `Nona`
                      }
                      label="Nona"
                      required
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div>
            {passengerDetails.child !== 0 ? (
              <h1 className="mt-4 mb-6 text-xl font-semibold text-black">
                Penumpang {passengerDetails.child} (Anak)
              </h1>
            ) : (
              ""
            )}
            {[...Array(passengerDetails.child)].map((_, index) => (
              <div
                key={index}
                className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-20 lg:items-start"
              >
                <div className="flex flex-col mb-7">
                  <InputComponent
                    type="text"
                    id={`child-Name-${index}`}
                    name={`child-Name-${index}`}
                    customStyle={`py-[16px] pl-[20px] pr-[20px]`}
                    onChange={handleChange}
                    value={flightData[`child-Name-${index}`] || ""}
                    placeholder="Nama Lengkap"
                    required
                  />
                </div>

                <div className={`flex items-center ${index === 0 ? "" : "lg:pt-3"} mb-7 md:pl-1`}>
                  <div className="flex items-center mr-3 sm:mr-10">
                    <InputRadioComponent
                      id={`child-Tuan-${index}`}
                      name={`child-Call-${index}`}
                      onChange={handleChange}
                      value="Tuan"
                      label="Tuan"
                      required
                    />
                  </div>

                  <div className="flex items-center mr-3 sm:mr-10">
                    <InputRadioComponent
                      id={`child-Nyonya-${index}`}
                      name={`child-Call-${index}`}
                      onChange={handleChange}
                      value="Nyonya"
                      label="Nyonya"
                      required
                    />
                  </div>

                  <div className="flex items-center">
                    <InputRadioComponent
                      id={`child-Nona-${index}`}
                      name={`child-Call-${index}`}
                      onChange={handleChange}
                      value="Nona"
                      label="Nona"
                      required
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div>
            {passengerDetails.infant !== 0 ? (
              <h1 className="mt-4 mb-6 text-xl font-semibold text-black">
                Penumpang {passengerDetails.infant} (Bayi)
              </h1>
            ) : (
              ""
            )}
            {[...Array(passengerDetails.infant)].map((_, index) => (
              <div
                key={index}
                className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-20 lg:items-start"
              >
                <div className="flex flex-col mb-7">
                  <InputComponent
                    type="text"
                    id={`infant-Name-${index}`}
                    name={`infant-Name-${index}`}
                    customStyle={`py-[16px] pl-[20px] pr-[20px]`}
                    onChange={handleChange}
                    value={flightData[`infant-Name-${index}`] || ""}
                    placeholder="Nama Lengkap"
                    required
                  />
                </div>

                <div className={`flex items-center ${index === 0 ? "" : "lg:pt-3"} mb-7 md:pl-1`}>
                  <div className="flex items-center mr-3 sm:mr-10">
                    <InputRadioComponent
                      id={`infant-Tuan-${index}`}
                      name={`infant-Call-${index}`}
                      onChange={handleChange}
                      value="Tuan"
                      label="Tuan"
                      required
                    />
                  </div>

                  <div className="flex items-center mr-3 sm:mr-10">
                    <InputRadioComponent
                      id={`infant-Nyonya-${index}`}
                      name={`infant-Call-${index}`}
                      onChange={handleChange}
                      value="Nyonya"
                      label="Nyonya"
                      required
                    />
                  </div>

                  <div className="flex items-center">
                    <InputRadioComponent
                      id={`infant-Nona-${index}`}
                      name={`infant-Call-${index}`}
                      onChange={handleChange}
                      value="Nona"
                      label="Nona"
                      required
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <div className="flex flex-col md:w-3/6 lg:w-2/6 pb-10 mx-auto mt-16 md:mt-28 gap-y-4">
          <Button type="primary-dark" width="full" color="primary-dark" disabled={isLoading}>
            {isLoading ? "Loading ..." : "Lanjutkan"}
          </Button>
        </div>
      </form>
    </>
  );
};

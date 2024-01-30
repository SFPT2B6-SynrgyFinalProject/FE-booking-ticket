import { useState } from "react";
import { StepperControl } from "./steps/stepperControl";
import { Stepper } from "../../../../components/Stepper";
import { ContainerPage } from "../../../../components/common-page/ContainerPage";
import { Booking } from "./steps/booking";
import { Payment } from "./steps/payment";
import { Eticket } from "./steps/eTicket";
import { IFlightData, IPaymentData } from "./../flights.types";
import useActionFlightOrder from "./steps/booking.hooks";

function FlightOrder() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [flightData, setFlightData] = useState<IFlightData>({
    name: "",
    name1: "",
    phoneNumber: "",
    email: "",
    call: "",
    call1: "",
  });

  const [paymentData, setPaymentData] = useState<IPaymentData>({
    cardNumber: "",
    cardName: "",
    cvv: "",
    expiredDate: "",
  });

  const steps: string[] = ["Pemesanan", "Pembayaran", "E-tiket"];

  const displayStep = (step: number) => {
    switch (step) {
      case 1:
        return <Booking formFlightData={flightData} setFormFlightData={setFlightData} />;
      case 2:
        return <Payment formPaymentData={paymentData} setFormPaymentData={setPaymentData} />;
      case 3:
        return <Eticket />;
      default:
        return null;
    }
  };

  const { handleSubmitFlightOrder } = useActionFlightOrder();

  const handleClick = (direction: "next" | "prev") => {
    let newStep = currentStep;

    if (direction === "next") {
      if (newStep === 1) {
        alert(flightData.name);
        handleSubmitFlightOrder();
      } else if (newStep === 2) {
        alert("Submit Payment");
      }
      newStep++;
    }
    // else {
    //   newStep--;
    // }

    // check if step is within bounds
    if (newStep > 0 && newStep <= steps.length) {
      setCurrentStep(newStep);
    }
  };

  // console.log(currentStep);
  // console.log(flightData);

  return (
    <>
      <ContainerPage>
        <div className="hidden sm:block sm:w-3/4 sm:mx-auto sm:mb-20">
          {/* Stepper */}
          <Stepper steps={steps} currentStep={currentStep} />
        </div>

        <div>
          <div>
            {/* Display Component */}
            <div className="pb-8">{displayStep(currentStep)}</div>
          </div>

          {/* Navigation Control */}
          <StepperControl handleClick={handleClick} currentStep={currentStep} steps={steps} />
        </div>
      </ContainerPage>
    </>
  );
}

export default FlightOrder;

import { Stepper } from "../../components/Stepper";
import { StepperControl } from "../../components/StepperControl";
import { Booking } from "../../components/steps/Booking";
import { Payment } from "../../components/steps/Payment";
import { useState } from "react";
import { Eticket } from "../../components/steps/Eticket";
import { StepperContext } from "../../components/context/StepperContext";
import { ContainerPage } from "../../components/common-page/ContainerPage";

function Flight() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [orderData, setOrderData] = useState<string>("");
  const [finalData, setFinalData] = useState<string[]>([]);
  const steps: string[] = ["Pemesanan", "Pembayaran", "E-tiket"];

  const displayStep = (step: number) => {
    switch (step) {
      case 1:
        return <Booking />;
      case 2:
        return <Payment />;
      case 3:
        return <Eticket />;
      default:
        return null;
    }
  };

  const handleClick = (direction: "next" | "prev") => {
    let newStep = currentStep;

    if (direction === "next") {
      newStep++;
    } else {
      newStep--;
    }

    // check if step is within bounds
    if (newStep > 0 && newStep <= steps.length) {
      setCurrentStep(newStep);
    }
  };

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
            <div className="pb-8">
              <StepperContext.Provider
                value={{
                  orderData,
                  setOrderData,
                  finalData,
                  setFinalData,
                }}
              >
                {displayStep(currentStep)}
              </StepperContext.Provider>
            </div>
          </div>

          {/* Navigation Control */}
          <StepperControl handleClick={handleClick} currentStep={currentStep} steps={steps} />
        </div>
      </ContainerPage>
    </>
  );
}

export default Flight;

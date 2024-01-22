import { Stepper } from "../../components/Stepper";
import { StepperControl } from "../../components/StepperControl";
import { Booking } from "../../components/steps/Booking";
import { Payment } from "../../components/steps/Payment";
import { useState } from "react";
import { Eticket } from "../../components/steps/Eticket";
import { StepperContext } from "../../components/context/StepperContext";

function App() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [userData, setUserData] = useState<string>("");
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
    <div className="container mx-auto mt-20 mb-24 px-28">
      <div className="w-3/4 mx-auto mb-20">
        {/* Stepper */}
        <Stepper steps={steps} currentStep={currentStep} />
      </div>
      <div className="">
        <div className="">
          {/* Display Component */}
          <div className="p-8">
            <StepperContext.Provider
              value={{
                userData,
                setUserData,
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
    </div>
  );
}

export default App;

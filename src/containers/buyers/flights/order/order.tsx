import { useEffect } from "react";
import { Stepper } from "../../../../components/Stepper";
import { ContainerPage } from "../../../../components/common-page/ContainerPage";
import { Booking } from "./steps/booking";
import { Payment } from "./steps/payment";
import { Eticket } from "./steps/eTicket";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../config/redux/store";
import { setCurrentStep } from "../../../../config/redux/action";
import { useSelector } from "react-redux";
import { RootState } from "../../../../config/redux/store";

function FlightOrder() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(setCurrentStep(1));
  }, [dispatch]);

  const currentStep = useSelector((state: RootState) => state.currentStepReducer);
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

  return (
    <>
      <ContainerPage>
        <div
          className={`${
            currentStep === 3 ? "hide-on-print" : ""
          } hidden sm:block sm:w-3/4 sm:mx-auto sm:mb-20`}
        >
          {/* Stepper */}
          <Stepper steps={steps} currentStep={currentStep} />
        </div>

        <div>
          <div>
            {/* Display Component */}
            <div className="pb-8">{displayStep(currentStep)}</div>
          </div>

          {/* Navigation Control */}
          {/* <StepperControl currentStep={currentStep} steps={steps} /> */}
        </div>
      </ContainerPage>
    </>
  );
}

export default FlightOrder;

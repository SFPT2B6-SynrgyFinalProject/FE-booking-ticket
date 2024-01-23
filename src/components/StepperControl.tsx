import React from "react";
import Button from "./Button";
import { Icon } from "@iconify/react/dist/iconify.js";

interface StepperControlProps {
  handleClick: (action?: any) => void;
  currentStep: number;
  steps: string[];
}

export const StepperControl: React.FC<StepperControlProps> = ({
  handleClick,
  currentStep,
  steps,
}) => {
  return (
    <div className="flex flex-col md:w-3/6 lg:w-2/6 pb-10 mx-auto mt-14 gap-y-4">
      <Button
        onClick={() => handleClick("next")}
        type="primary-dark"
        width="full"
        color="primary-dark"
        // disabled={!email || !password || isLoading}
      >
        {currentStep === steps.length - 1
          ? "Lanjutkan Pembayaran"
          : currentStep === steps.length
          ? "Unduh E-tiket"
          : "Lanjutkan"}
      </Button>

      <Button
        onClick={() => handleClick()}
        type="secondary"
        width="full"
        color="secondary-normal"
        className={`!bg-gray-200/80 ${
          currentStep === 1 ? "hidden" : currentStep === 3 ? "hidden" : ""
        }`}
      >
        <Icon icon="tabler:arrow-left" width={24} height={24} /> Kembali
      </Button>
    </div>
  );
};

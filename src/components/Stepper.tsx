import React, { useEffect, useRef, useState } from "react";

interface Step {
  description: string;
  completed: boolean;
  highlighted: boolean;
  selected: boolean;
}

interface StepperProps {
  steps: string[];
  currentStep: number;
}

export const Stepper: React.FC<StepperProps> = ({ steps, currentStep }) => {
  const [newStep, setNewStep] = useState<Step[]>([]);
  const stepRef = useRef<Step[]>([]);

  const updateStep = (stepNumber: number, steps: Step[]): Step[] => {
    const newSteps = [...steps];
    let count = 0;

    while (count < newSteps.length) {
      // current step
      if (count === stepNumber) {
        newSteps[count] = {
          ...newSteps[count],
          highlighted: true,
          selected: true,
          completed: true,
        };
        count++;
      }
      // step complete
      else if (count < stepNumber) {
        newSteps[count] = {
          ...newSteps[count],
          highlighted: false,
          selected: true,
          completed: true,
        };
        count++;
      }
      // step pending
      else {
        newSteps[count] = {
          ...newSteps[count],
          highlighted: false,
          selected: false,
          completed: false,
        };
        count++;
      }
    }

    return newSteps;
  };

  useEffect(() => {
    // create object
    const stepsState: Step[] = steps.map((step, index) => ({
      description: step,
      completed: false,
      highlighted: index === 0,
      selected: index === 0,
    }));

    stepRef.current = stepsState;
    const current = updateStep(currentStep - 1, stepRef.current);
    setNewStep(current);
  }, [steps, currentStep]);

  const displaySteps = newStep.map((step, index) => (
    <div
      key={index}
      className={
        
        index !== newStep.length - 1
          ? "w-full flex items-center"
          : "flex items-center"
      }
        data-testid={`step-${index + 1}`} 
    >
      <div className="relative flex flex-col items-center text-blue-600">
        <div
          className={`rounded-full transition duration-500 ease-in-out border-2 h-9 w-9 flex items-center justify-center py-3 ${
            step.selected
              ? "bg-white text-white font-bold border border-blue-600"
              : "border-gray-300"
          }`}
        >
          {/* Display Number */}
          {step.completed ? (
            <span className="text-2xl font-semibold text-blue-600">&#10003;</span>
          ) : (
            ""
          )}
        </div>
        <div
          className={`absolute top-0 text-center text-black mt-12 w-32 text-sm font-semibold ${
            step.highlighted ? "text-gray-800" : "text-gray-400"
          }`}
        >
          {/* Display Description */}
          {step.description}
        </div>
      </div>

      <div
        className={`flex-auto border-t-2 border-dashed transition duration-500 ease-in-out ${
          step.completed ? "border-blue-700" : "border-gray-300"
        }`}
      >
        {/* Display line */}
      </div>
    </div>
  ));

  return <div className="flex items-center justify-between p-2 mx-4">{displaySteps}</div>;
};

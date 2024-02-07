import { render } from '@testing-library/react';
import { Stepper } from '../Stepper';

describe('Stepper', () => {
  test('renders stepper with correct steps and current step', () => {
    const steps = ['Step 1', 'Step 2', 'Step 3'];
    const currentStep = 2;

    const { getByText, queryByTestId } = render(
      <Stepper steps={steps} currentStep={currentStep} />
    );

    // Ensure all steps are rendered
    steps.forEach((step) => {
      const stepElement = getByText(step);
      expect(stepElement).toBeTruthy();
    });

    // Ensure current step is selected and highlighted
    const currentStepElement = queryByTestId(`step-${currentStep}`);
    expect(currentStepElement).not.toBeNull(); // Memastikan elemen tidak null

    if (currentStepElement) { // Memeriksa apakah elemen tidak null sebelum mengakses propertinya
      expect(currentStepElement.className).toContain('w-full flex items-center');
      expect(currentStepElement.className).toContain('w-full flex items-center');
      expect(currentStepElement.className).toContain('w-full flex items-center');
      expect(currentStepElement.className).toContain('w-full flex items-center');
    }
  });
});

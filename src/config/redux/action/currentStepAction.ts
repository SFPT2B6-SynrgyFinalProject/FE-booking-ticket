export const setCurrentStep = (payload: number) => {
  return {
    type: "GET_CURRENT_STEP_FLIGHT_ORDER",
    payload: payload,
  };
};

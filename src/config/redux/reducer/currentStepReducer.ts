import { PayloadAction } from "@reduxjs/toolkit";

const initialState: number = 0;

export const currentStepReducer = (state = initialState, action: PayloadAction<number>) => {
  if (action.type === "GET_CURRENT_STEP_FLIGHT_ORDER") {
    return action.payload;
  }
  return state;
};

import { PayloadAction } from "@reduxjs/toolkit";

interface LoadingState {
  isLoading: boolean;
}

const initialState: LoadingState = {
  isLoading: false
};

export const isLoadingReducer = (
  state = initialState,
  action: PayloadAction<boolean>
) => {
  if (action.type === "SET_LOADING") {
    return {
      ...state,
      isLoading: action.payload,
    };
  }
  return state;
};

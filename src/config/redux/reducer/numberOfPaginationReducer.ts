import { PayloadAction } from "@reduxjs/toolkit";

interface NumberPaginationType {
  num: number;
}

const initialState: NumberPaginationType = {
  num: 0,
};

export const numberPaginationReducer = (
  state = initialState,
  action: PayloadAction<number>
) => {
  if (action.type === "CURRENT_PAGE") {
    return {
      ...state,
      num: action.payload,
    };
  }
  return state;
};

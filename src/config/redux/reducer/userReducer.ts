import { PayloadAction } from "@reduxjs/toolkit"

export interface UserState {
  fullName: string,
  gender: string,
  noHp: string | null,
  birthDate: string,
  email: string
}

const initialState: UserState = {
  fullName: "",
  gender: "",
  noHp: "",
  birthDate: "",
  email: ""
}

export const userReducer = (state = initialState, action: PayloadAction<UserState>) => {
  if (action.type === "GET_USER_DATA") {
    return {
      ...state,
      ...action.payload
    }
  }
  return state
}
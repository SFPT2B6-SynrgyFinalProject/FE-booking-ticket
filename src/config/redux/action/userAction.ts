import { UserResponse } from "../../../lib/services/userLogin";

export const setUserData = (payload: UserResponse) => {
  return {
    type: "GET_USER_DATA",
    payload: payload.data
  }
} 
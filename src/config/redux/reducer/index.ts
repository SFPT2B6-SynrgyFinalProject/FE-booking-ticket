import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { flightOrderReducer } from "./flightOrderReducer";
import { currentStepReducer } from "./currentStepReducer";
import { flightClassReducer } from "./flightClassReducer";
import { airportReducer } from "./airportReducer";
import { getDataBySearchReducer } from "./getDataBySearchReducer";
import { resultSearchReducer } from "./resultSearchReducer";
import { isLoadingReducer } from "./isLoadingReducer";
import { numberPaginationReducer } from "./numberOfPaginationReducer";
import { getTicketReducer } from "./getTicketReducer";

export const reducer = combineReducers({
  userReducer,
  flightClassReducer,
  airportReducer,
  getDataBySearchReducer,
  resultSearchReducer,
  isLoadingReducer,
  numberPaginationReducer,
  getTicketReducer,
  flightOrderReducer,
  currentStepReducer,
});

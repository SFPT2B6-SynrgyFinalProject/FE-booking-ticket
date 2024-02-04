import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { flightOrderReducer } from "./flightOrderReducer";
import { currentStepReducer } from "./currentStepReducer";

export const reducer = combineReducers({ userReducer, flightOrderReducer, currentStepReducer });

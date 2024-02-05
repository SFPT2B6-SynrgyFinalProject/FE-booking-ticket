import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import {notificationReducer} from './notificationReducer';

export const reducer = combineReducers({userReducer, notificationReducer});
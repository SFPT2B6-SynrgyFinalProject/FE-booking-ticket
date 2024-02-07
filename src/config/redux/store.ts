import { configureStore } from "@reduxjs/toolkit";
import { reducer } from "./reducer";

export const store = configureStore({ reducer, preloadedState: {notificationReducer: {orderCount: Number(localStorage.getItem('orderCount'))} }});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

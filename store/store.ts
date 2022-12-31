import thunk from "redux-thunk";
import { createWrapper } from "next-redux-wrapper";
import { configureStore } from "@reduxjs/toolkit";
import actionSlots from "./reducers/actionSlots";

// initial states here
const initalState = {};

// middleware
const middleware = [thunk];

// creating store
export const store = configureStore({
  reducer: {
    actionSlots,
  },
});

// assigning store to next wrapper
const makeStore = () => store;

export const wrapper = createWrapper(makeStore);
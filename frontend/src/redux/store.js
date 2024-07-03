import { configureStore } from "@reduxjs/toolkit";
import predictionSlice from "./features/prediction-slice";

export const store = configureStore({
  reducer: {
    prediction: predictionSlice,
  },
});

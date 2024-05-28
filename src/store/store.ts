import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import LocationReducer from "./getLocations/LocationSlice";

const locationConfigure = {
  key: "auth",
  storage,
};

const presistLocation = persistReducer(locationConfigure, LocationReducer);
const store = configureStore({
  reducer: {
    lcation: presistLocation,
  },
});
export const persistor = persistStore(store);
export default store;

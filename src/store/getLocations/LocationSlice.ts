import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: {
  loading: boolean;
  longitude: number;
  latitude: number;
  returents: {} | null;
} = {
  loading: false,
  longitude: 0,
  latitude: 0,
  returents: null,
};

const LocationSlice = createSlice({
  name: "Location",
  initialState,
  reducers: {
    setLongitute: (state: any, action) => {
      state.longitude = action.payload;
    },
    setLatitude: (state, action) => {
      state.latitude = action.payload;
    },
    setResturents: (state, action) => {
      state.returents = action.payload;
    },
  },
  extraReducers: () => {},
});

export const { setLongitute, setLatitude, setResturents } =
  LocationSlice.actions;
export default LocationSlice.reducer;

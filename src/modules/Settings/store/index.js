import AsyncStorage from "@react-native-async-storage/async-storage"
import { createSlice } from "@reduxjs/toolkit"
import { persistReducer } from "redux-persist"

import { COLOR_MODES } from "../constants"

const initialState = {
  appearance: {
    colorMode: "auto",
  },
}

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    changeColorMode: (state, { payload: colorMode }) => {
      if (!COLOR_MODES.includes(colorMode)) {
        throw new Error(`Invalid color scheme value: ${colorMode}`)
      }

      state.appearance.darkMode = colorMode
    },
  },
})

export const settingsReducer = persistReducer(
  {
    key: "@settings",
    storage: AsyncStorage,
    whitelist: ["appearance"],
  },
  settingsSlice.reducer,
)

export const selectColorMode = (state) => state.appearance.colorMode

import { configureStore, combineReducers } from "@reduxjs/toolkit"
import { persistStore } from "redux-persist"
import * as SettingsModule from "settings-module"

const rootReducer = combineReducers({
  [SettingsModule.settingsSlice.name]: SettingsModule.settingsReducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat([]),
})

export const persistor = persistStore(store)

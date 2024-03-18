import { NavigationContainer } from "@react-navigation/native"
import { Navigator as CoreNavigator, Utils, ThemeProvider, Store } from "core-module"
import { Provider as StoreProvider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"

function App() {
  return (
    <StoreProvider store={Store.store}>
      <PersistGate persistor={Store.persistor}>
        <ThemeProvider>
          <NavigationContainer prefix={Utils.getDeepLink()}>
            <CoreNavigator />
          </NavigationContainer>
        </ThemeProvider>
      </PersistGate>
    </StoreProvider>
  )
}

export default App

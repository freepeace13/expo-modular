import { useFonts, Roboto_400Regular, Roboto_500Medium } from "@expo-google-fonts/roboto"
import { registerRootComponent } from "expo"
import * as SplashScreen from "expo-splash-screen"
import { useState, useEffect } from "react"

import App from "./src/App"

SplashScreen.preventAutoHideAsync().catch(() => undefined)

export default function Main() {
  const [isAppReady, setIsAppReady] = useState(false)
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
  })

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.hideAsync()
      } catch (e) {
        //
      } finally {
        setIsAppReady(true)
      }
    }
    if (fontsLoaded) {
      prepare()
    }
  }, [fontsLoaded])

  if (!isAppReady) {
    return null
  }

  return <App />
}

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately
registerRootComponent(Main)

import { useFonts, Roboto_400Regular, Roboto_500Medium } from "@expo-google-fonts/roboto"
import { registerRootComponent } from "expo"
import * as SplashScreen from "expo-splash-screen"

import App from "./src/App"

SplashScreen.preventAutoHideAsync().catch(() => {
  /* reloading the app might trigger some race conditions, ignore them */
})

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately
registerRootComponent(App)

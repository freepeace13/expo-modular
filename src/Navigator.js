import { createDrawerNavigator } from "@react-navigation/drawer"
import { Text } from "react-native-paper"

const CoreDrawer = createDrawerNavigator()

function Screen1() {
  return <Text>screen 1</Text>
}
function Screen2() {
  return <Text>screen 2</Text>
}

function CoreNavigator() {
  return (
    <CoreDrawer.Navigator screenOptions={{ headerShown: false }}>
      <CoreDrawer.Screen name="Screen1" component={Screen1} />
      <CoreDrawer.Screen name="Screen2" component={Screen2} />
    </CoreDrawer.Navigator>
  )
}

export default CoreNavigator

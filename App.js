import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useFonts } from "expo-font";
import { View } from "react-native";
import {
  CommentsScreen,
  HomeScreen,
  LoginScreen,
  MapScreen,
  RegistrationScreen,
} from "./Screens";

const AuthStack = createStackNavigator();
const Main = createStackNavigator();

export default function App() {
  const [loaded] = useFonts({
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
  });
  const isAuth = true;

  if (!loaded) {
    return <View />;
  }

  return (
    <NavigationContainer>
      {isAuth ? (
        <Main.Navigator>
          <Main.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Main.Screen name="Map" component={MapScreen} />
          <Main.Screen name="Comments" component={CommentsScreen} />
        </Main.Navigator>
      ) : (
        <AuthStack.Navigator
          initialRouteName="Login"
          screenOptions={{ headerShown: false }}
        >
          <AuthStack.Screen
            name="Registration"
            component={RegistrationScreen}
          />
          <AuthStack.Screen name="Login" component={LoginScreen} />
        </AuthStack.Navigator>
      )}
    </NavigationContainer>
  );
}

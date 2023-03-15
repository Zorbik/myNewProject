import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { View } from "react-native";
import { Provider } from "react-redux";
import { Layout } from "./components/Layout.jsx";
import { store } from "./redux/store";

export default function App() {
  const [loaded] = useFonts({
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
  });

  if (!loaded) {
    return <View />;
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Layout />
      </NavigationContainer>
    </Provider>
  );
}

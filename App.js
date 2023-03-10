import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
// import { StatusBar } from "expo-status-bar";
import { Feather, AntDesign } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { TouchableOpacity, View } from "react-native";
import {
  CommentsScreen,
  CreatePostsScreen,
  HomeScreen,
  LoginScreen,
  MapScreen,
  PostsScreen,
  ProfileScreen,
  RegistrationScreen,
} from "./Screens";
import { useState } from "react";

const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

const authOptions = {
  headerShown: false,
};

const tabOptions = ({ route }) => ({
  tabBarShowLabel: false,
  // tabBarButton: (props) => <TouchableOpacity {...props} />,
  tabBarActiveTintColor: "#ffffff",
  tabBarActiveBackgroundColor: "#FF6C00",
  tabBarIconStyle: { color: "#212121CC" },
  tabBarHideOnKeyboard: true,
  tabBarIcon: ({ color }) => {
    if (route.name === "Posts") {
      return <AntDesign name="appstore-o" size={24} color={color} />;
    }
    if (route.name === "CreatePosts") {
      return <AntDesign name="plus" size={24} color={color} />;
    }
    return <Feather name="user" size={24} color={color} />;
  },
  tabBarItemStyle: {
    height: 40,
    width: 70,
    borderRadius: 20,
    marginHorizontal: 8,
  },
  tabBarStyle: {
    height: 83,
    paddingTop: 9,
    paddingHorizontal: 59,
  },
});

function InnerStack() {
  return (
    <MainTab.Navigator>
      <MainTab.Screen name="Map" component={MapScreen} />
      <MainTab.Screen name="Comments" component={CommentsScreen} />
    </MainTab.Navigator>
  );
}

export default function App() {
  const [loaded] = useFonts({
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
  });
  const isAuth = false;

  if (!loaded) {
    return <View />;
  }

  return (
    <NavigationContainer>
      {isAuth ? (
        <MainTab.Navigator screenOptions={(route) => tabOptions(route)}>
          {/* <MainTab.Screen name="Home" component={HomeScreen} /> */}
          <MainTab.Screen name="Posts" component={PostsScreen} />

          <MainTab.Screen name="CreatePosts" component={CreatePostsScreen} />
          <MainTab.Screen name="Profile" component={ProfileScreen} />
          {/* <MainTab.Screen name="Map" component={MapScreen} /> */}

          {/* <MainTab.Screen name="Comments" component={CommentsScreen} /> */}
        </MainTab.Navigator>
      ) : (
        <AuthStack.Navigator initialRouteName="Login">
          <AuthStack.Screen
            options={authOptions}
            name="Registration"
            component={RegistrationScreen}
          />
          <AuthStack.Screen
            options={authOptions}
            name="Login"
            component={LoginScreen}
          />
        </AuthStack.Navigator>
      )}
      {/* <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <StatusBar style="auto" />
      </View> */}
    </NavigationContainer>
  );
}

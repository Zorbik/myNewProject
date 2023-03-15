import { createStackNavigator } from "@react-navigation/stack";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";

import {
  CommentsScreen,
  HomeScreen,
  LoginScreen,
  MapScreen,
  RegistrationScreen,
} from "../Screens";
import { auth } from "../firebase/config";
import { getCurrentUser } from "../redux/auth/authSlice";

const AuthStack = createStackNavigator();
const Main = createStackNavigator();

export const Layout = () => {
  const { isAuth } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const userInfo = {
          userId: user.uid,
          login: user.displayName,
          email: user.email,
          avatar: user.photoURL,
        };
        dispatch(getCurrentUser(userInfo));
      }
    });
  }, []);

  return isAuth ? (
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
      <AuthStack.Screen name="Registration" component={RegistrationScreen} />
      <AuthStack.Screen name="Login" component={LoginScreen} />
    </AuthStack.Navigator>
  );
};

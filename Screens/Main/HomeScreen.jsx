import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather, AntDesign, Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";

import { PostsScreen } from "./PostsScreen";
import { CreatePostsScreen } from "./CreatePostsScreen";
import { ProfileScreen } from "./ProfileScreen";
import { authSignOutUser } from "../../redux/auth/authOperations";

const MainTab = createBottomTabNavigator();

const tabOptions = ({ navigation, route }) => ({
  tabBarShowLabel: false,
  tabBarButton: (props) => <TouchableOpacity {...props} />,
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

  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.goBack();
      }}
      style={{ left: 16 }}
    >
      <Ionicons name="arrow-back-sharp" size={24} color="#BDBDBD" />
    </TouchableOpacity>
  ),
  headerTitleStyle: {
    marginLeft: 130,
  },
});

export function HomeScreen() {
  const dispatch = useDispatch();
  return (
    <MainTab.Navigator initialRouteName="Posts" screenOptions={tabOptions}>
      <MainTab.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          headerRight: () => (
            <TouchableOpacity
              onPress={() => dispatch(authSignOutUser())}
              style={{ right: 16 }}
            >
              <Feather name="log-out" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          ),
        }}
      />
      <MainTab.Screen name="CreatePosts" component={CreatePostsScreen} />
      <MainTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
    </MainTab.Navigator>
  );
}

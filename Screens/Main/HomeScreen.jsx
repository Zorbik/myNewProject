import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather, AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { PostsScreen } from "./PostsScreen";
import { CreatePostsScreen } from "./CreatePostsScreen";
import { ProfileScreen } from "./ProfileScreen";

const MainTab = createBottomTabNavigator();

const tabOptions = ({ route }) => ({
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
});

export function HomeScreen() {
  return (
    <MainTab.Navigator initialRouteName="Posts" screenOptions={tabOptions}>
      <MainTab.Screen name="Posts" component={PostsScreen} />
      <MainTab.Screen name="CreatePosts" component={CreatePostsScreen} />
      <MainTab.Screen name="Profile" component={ProfileScreen} />
    </MainTab.Navigator>
  );
}

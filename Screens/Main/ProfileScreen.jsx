import { Feather, Ionicons } from "@expo/vector-icons";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { ProfilePostItem } from "../../components/ProfilePostItem";
import { db } from "../../firebase/config";
import { authSignOutUser } from "../../redux/auth/authOperations";

export function ProfileScreen({ navigation }) {
  const { avatar, email, isAuth, login, userId } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const [picture] = useState(avatar || "");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "posts"), where("ownerId", "==", userId));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const allPosts = [];
      querySnapshot.forEach((post) => {
        allPosts.push({ ...post.data(), postId: post.id });
      });
      setPosts(allPosts);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <ImageBackground
      source={require("../../assets/images/background.jpg")}
      style={styles.imageBgr}
    >
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => dispatch(authSignOutUser())}
          style={styles.exitBtn}
        >
          <Feather name="log-out" size={24} color="#bdbdbd" />
        </TouchableOpacity>
        <View style={styles.avatar}>
          {avatar ? (
            <Image style={styles.img} source={{ uri: avatar }} />
          ) : (
            <Ionicons name="ios-person-outline" size={120} color="#bdbdbd" />
          )}
          {picture ? (
            <TouchableOpacity
              style={picture ? styles.btnAddActive : styles.btnAdd}
              activeOpacity={1}
            >
              <Ionicons name="close-outline" size={24} color="#E8E8E8" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={picture ? styles.btnAddActive : styles.btnAdd}
              activeOpacity={1}
              onPress={takePhoto}
            >
              <Ionicons size={24} name="add-outline" color="#FF6C00" />
            </TouchableOpacity>
          )}
        </View>
        <Text style={styles.login}>{login}</Text>
        <View>
          {posts.length ? (
            <FlatList
              data={posts}
              keyExtractor={(item) => item.postId}
              renderItem={(item) => (
                <ProfilePostItem post={item} navigation={navigation} />
              )}
            />
          ) : (
            <Text></Text>
          )}
        </View>
      </View>
    </ImageBackground>
  );
}

export const styles = StyleSheet.create({
  imageBgr: { flex: 1 },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 125,
    marginTop: 147,
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  exitBtn: {
    position: "absolute",
    top: 22,
    right: 16,
  },
  avatar: {
    position: "relative",
    borderRadius: 16,
    width: 120,
    height: 120,
    marginTop: -60,
    backgroundColor: "#F6F6F6",
    alignSelf: "center",
  },
  img: { width: 120, height: 120, borderRadius: 16 },
  btnAdd: {
    position: "absolute",
    bottom: 14,
    right: -12.5,
    width: 25,
    height: 25,
    borderRadius: 25,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#FF6C00",
  },
  btnAddActive: {
    position: "absolute",
    bottom: 14,
    right: -12.5,
    width: 25,
    height: 25,
    borderRadius: 25,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E8E8E8",
  },
  login: {
    color: "#212121",
    fontSize: 30,
    lineHeight: 35,
    fontWeight: "500",
    textAlign: "center",
    marginTop: 32,
  },
});

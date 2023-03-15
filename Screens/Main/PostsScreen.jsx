import { useEffect, useState } from "react";
import { FlatList, Image, Text, View } from "react-native";
import { StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

import { db } from "../../firebase/config.js";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

import { PostItem } from "../../components/PostItem.jsx";

export function PostsScreen({ navigation }) {
  const [posts, setPosts] = useState([]);

  const { avatar, email, login } = useSelector((state) => state.auth);

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("dateCreate", "desc"));
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
    <View style={styles.container}>
      <View style={styles.userContainer}>
        {avatar ? (
          <Image style={styles.img} source={{ uri: avatar }} />
        ) : (
          <Ionicons name="ios-person-outline" size={60} color="#bdbdbd" />
        )}
        <View style={styles.textContainer}>
          <Text style={styles.textName}>{login ?? login}</Text>
          <Text style={styles.textEmail}>{email ?? email}</Text>
        </View>
      </View>
      <View>
        {posts.length ? (
          <FlatList
            data={posts}
            keyExtractor={(item) => item.postId}
            renderItem={(item) => (
              <PostItem post={item} navigation={navigation} />
            )}
          />
        ) : (
          <Text></Text>
        )}
      </View>
    </View>
  );
}

export const styles = StyleSheet.create({
  container: { paddingHorizontal: 16, paddingBottom: 195 },
  userContainer: {
    flexDirection: "row",
    marginTop: 32,
  },
  img: {
    width: 60,
    height: 60,
    borderRadius: 16,
    marginRight: 8,
  },
  textContainer: { justifyContent: "center" },
  textName: {
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 16,
    color: "#212121",
  },
  textEmail: {
    fontSize: 11,
    fontWeight: "400",
    lineHeight: 13,
    color: "#212121CC",
  },
});

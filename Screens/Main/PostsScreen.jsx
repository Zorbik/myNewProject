import { useEffect, useState } from "react";
import { FlatList, Image, Text, View } from "react-native";
import { StyleSheet } from "react-native";

export function PostsScreen({ route }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // if (route.params) {
    setPosts((prevState) => [...prevState, route.params]);
    console.log("posts:", posts);
    // }
  }, [route.params]);
  return (
    <View style={styles.container}>
      <View>
        {/* <Image source={{ uri: route.params.photo }} /> */}
        <Text>sdfg</Text>
        <Text>ddfg</Text>
      </View>
      <View style={styles.postList}>
        {/* {posts.length ? (
          <FlatList
            data={posts}
            keyExtractor={(index) => index.toString()}
            renderItem={(item) => (
              <View style={styles.postItem}>
                <Image source={{ uri: item.photo }} />
              </View>
            )}
          />
        ) : (
          <Text></Text>
        )} */}
      </View>
    </View>
  );
}

export const styles = StyleSheet.create({
  container: { paddingHorizontal: 16, paddingVertical: 32 },
  postList: {},
  postItem: {},
});

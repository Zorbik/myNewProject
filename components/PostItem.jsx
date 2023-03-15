import { useEffect, useState } from "react";
import { Image, Text, View, TouchableOpacity, StyleSheet } from "react-native";

import { EvilIcons, Feather, AntDesign } from "@expo/vector-icons";

import { coordsToWords, getCount } from "../services";
import { useSelector } from "react-redux";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/config.js";

export const PostItem = ({ navigation, post }) => {
  const [countComments, setCountComments] = useState(null);
  const [countLikes, setCountLikes] = useState(null);
  const [location, setLocation] = useState("");
  const { userId } = useSelector((state) => state.auth);
  let {
    postId,
    photo,
    title,
    coords: { latitude, longitude },
    comments,
    likes,
  } = post.item;

  useEffect(() => {
    (async () => {
      try {
        const getCountComments = await getCount(postId, "comments");
        const getCountLikes = await getCount(postId, "likes");

        setCountComments(getCountComments);
        setCountLikes(getCountLikes);

        if (latitude) {
          setLocation(await getTextLocation());
        }
      } catch (error) {
        console.log("error:", error);
      }
    })();
  }, [likes]);

  const getTextLocation = async () => {
    const loc = await coordsToWords(latitude, longitude);

    const textLocation = `${loc[0].city}, ${loc[0].region}`;
    if (textLocation.length > 25) {
      textLocation = textLocation.slice(0, 25) + "...";
    }
    return textLocation;
  };

  const onLike = async () => {
    const index = likes.indexOf(userId);

    if (index > -1) {
      likes.splice(index, 1);
    } else {
      likes = [...likes, userId];
    }
    await updateDoc(doc(db, "posts", postId), {
      likes,
    });
  };

  return (
    <View style={styles.container}>
      {photo ? (
        <Image style={styles.img} source={{ uri: photo }} />
      ) : (
        <EvilIcons name="image" size={240} color="#bdbdbd" />
      )}
      <Text style={styles.title}>{title}</Text>
      <View style={styles.textContainer}>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() =>
              navigation.navigate("Comments", { photo, comments, postId })
            }
          >
            <View style={{ transform: [{ scaleX: -1 }] }}>
              <Feather
                style={styles.iconComment}
                name="message-circle"
                size={24}
                color="#bdbdbd"
              />
            </View>
            <Text style={styles.comments}>{countComments}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={onLike}>
            {likes?.includes(userId) ? (
              <AntDesign name="like1" size={24} color="#FF6C00" />
            ) : (
              <AntDesign
                style={styles.icon}
                name="like2"
                size={24}
                color="#bdbdbd"
              />
            )}
            <Text style={styles.comments}>{countLikes}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate("Map", { latitude, longitude })}
        >
          <Feather
            style={styles.icon}
            name="map-pin"
            size={24}
            color="#bdbdbd"
          />
          <Text style={styles.location}>{location}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginTop: 32 },

  img: {
    height: 240,
    borderRadius: 8,
  },
  iconComment: { marginLeft: 6 },
  icon: {
    marginRight: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 19,
    marginVertical: 8,
  },
  textContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
  btn: { flexDirection: "row", alignItems: "center" },
  comments: {
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 19,
    color: "#BDBDBD",
    marginRight: 6,
  },
  location: {
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 19,
    color: "#212121",
  },
});

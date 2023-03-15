import { Ionicons } from "@expo/vector-icons";
import { useEffect } from "react";
import { Image } from "react-native";
import { Text, View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

export const CommentItem = ({ comment }) => {
  const { userId: comUserId, text, userAva, createDate } = comment.item;
  const { userId } = useSelector((state) => state.auth);

  useEffect(() => {}, [styles]);

  return (
    <View
      style={comUserId === userId ? userStyles.container : styles.container}
    >
      {userAva ? (
        <Image
          source={{ uri: userAva }}
          style={comUserId === userId ? userStyles.img : styles.img}
        />
      ) : (
        <Ionicons
          style={comUserId === userId ? userStyles.img : styles.img}
          name="ios-person-outline"
          size={28}
          color="#bdbdbd"
        />
      )}
      <View
        style={
          comUserId === userId ? userStyles.textContainer : styles.textContainer
        }
      >
        <Text style={styles.text} lineBreakMode={"wrap"}>
          {text}
        </Text>
        <Text style={styles.date}>{createDate.textDate}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: "row" },
  img: {
    height: 28,
    width: 28,
    borderRadius: 28,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    borderRadius: 6,
    borderTopLeftRadius: 0,
    padding: 16,
    marginBottom: 24,
  },
  text: {
    color: "#212121",
    marginBottom: 8,
    fontSize: 13,
    fontWeight: "400",
    lineHeight: 18,
  },
  date: {
    color: "#BDBDBD",
    fontSize: 10,
    fontWeight: "400",
    lineHeight: 12,
    textAlign: "right",
  },
});

const userStyles = StyleSheet.create({
  container: {
    flexDirection: "row-reverse",
  },
  img: {
    height: 28,
    width: 28,
    borderRadius: 28,
    marginLeft: 16,
  },
  textContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    borderRadius: 6,
    borderTopRightRadius: 0,
    padding: 16,
    marginBottom: 24,
  },
  text: {
    color: "#212121",
    marginBottom: 8,
    fontSize: 13,
    fontWeight: "400",
    lineHeight: 18,
  },
  date: {
    color: "#BDBDBD",
    fontSize: 10,
    fontWeight: "400",
    lineHeight: 12,
  },
});

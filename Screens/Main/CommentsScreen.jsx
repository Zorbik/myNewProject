import { useState } from "react";
import {
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  View,
  Keyboard,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import uuid from "react-native-uuid";
import { useSelector } from "react-redux";
import { doc, updateDoc } from "firebase/firestore";

import { db } from "../../firebase/config";
import { CommentItem } from "../../components/CommentItem";

export function CommentsScreen({ route }) {
  const { photo, comments = [], postId } = route.params;
  const [comment, setComment] = useState("");
  const { userId, avatar } = useSelector((state) => state.auth);

  const dateToText = (data) => {
    const date = new Date(data);
    const month = date.toLocaleString("default", { month: "long" });
    const minutes = date.getMinutes();

    if (minutes === 0) {
      minutes = "00";
    } else if (minutes < 10) {
      minutes = `0${minutes}`;
    }

    const fullDate = `${date.getDate()} ${month} ${date.getFullYear()} | ${date.getHours()}:${minutes}`;
    return fullDate;
  };

  const onSubmit = async () => {
    Keyboard.dismiss();

    const commentObj = {
      commentId: uuid.v4(),
      text: comment,
      createDate: {
        unix: Date.now().toString(),
        textDate: dateToText(Date.now()),
      },
      userAva: avatar,
      userId,
    };

    comments.push(commentObj);

    await updateDoc(doc(db, "posts", postId), {
      comments,
    });

    setComment("");
  };

  return (
    <View style={styles.container}>
      {photo && <Image style={styles.img} source={{ uri: photo }} />}

      <FlatList
        style={styles.commentList}
        data={comments}
        keyExtractor={(item) => item.commentId}
        renderItem={(item) => <CommentItem comment={item} />}
      />
      <View>
        <TextInput
          style={styles.input}
          value={comment}
          placeholder={"Комментировать..."}
          placeholderTextColor={"#BDBDBD"}
          onChangeText={(value) => setComment(value)}
        />
        <TouchableOpacity style={styles.btn} onPress={onSubmit}>
          <AntDesign name="arrowup" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 32,
    paddingBottom: 16,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },

  img: {
    height: 240,
    borderRadius: 8,
  },
  commentList: {
    marginVertical: 32,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 50,
    backgroundColor: "#F6F6F6",
    padding: 16,
    fontSize: 16,

    lineHeight: 19,
    fontWeight: "500",
  },
  btn: {
    position: "absolute",
    top: 8,
    right: 8,
    borderRadius: 34,
    height: 34,
    width: 34,
    backgroundColor: "#FF6C00",
    justifyContent: "center",
    alignItems: "center",
  },

  // iconComment: { marginLeft: 6 },
  // icon: {
  //   marginRight: 5,
  // },
  // title: {
  //   fontSize: 16,
  //   fontWeight: "500",
  //   lineHeight: 19,
  //   marginVertical: 8,
  // },
  // textContainer: {
  //   justifyContent: "space-between",
  //   flexDirection: "row",
  // },
  //
  // location: {
  //   fontSize: 16,
  //   fontWeight: "400",
  //   lineHeight: 19,
  //   color: "#212121",
  // },
});

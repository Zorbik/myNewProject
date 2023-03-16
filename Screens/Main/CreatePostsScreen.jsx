import {
  Dimensions,
  Image,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import { launchCameraAsync, launchImageLibraryAsync } from "expo-image-picker";
import * as Permissions from "expo-permissions";
import Toast from "react-native-toast-message";
import * as Location from "expo-location";
import { uploadPhotoToServer } from "../../firebase/uploadPhoto";
import { uploadPost } from "../../firebase/uploadPost";
import { useSelector } from "react-redux";

const defaultBorderColor = "#E8E8E8";
const accentBorderColor = "#FF6C00";

const initialState = {
  photo: "",
  title: "",
  coords: "",
  ownerId: "",
  comments: [],
  dateCreate: "",
  likes: [],
};

export function CreatePostsScreen({ navigation }) {
  const [formData, setFormData] = useState(initialState);
  const [picture, setPicture] = useState("");

  const [titleBorderColor, setTitleBorderColor] = useState(defaultBorderColor);
  const [coordsBorderColor, setCoordsBorderColor] =
    useState(defaultBorderColor);
  const { userId } = useSelector((state) => state.auth);

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.log("Permission to access location was denied");
          return;
        }
      } catch (error) {
        console.log("error:", error);
      }
    })();
  }, []);

  const takePhoto = async () => {
    try {
      const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
      if (status !== "granted") {
        return console.log("Permission not granted");
      }

      const { assets } = await launchCameraAsync();

      if (!assets[0]?.uri) return;

      setPicture(assets[0]?.uri);

      const loc = await Location.getCurrentPositionAsync({});

      setFormData((prevState) => ({
        ...prevState,
        coords: loc.coords,
      }));
    } catch (error) {
      console.log("error:", error);
    }
  };

  const onSubmit = async () => {
    Keyboard.dismiss();

    try {
      const photoUrl = await uploadPhotoToServer(picture);

      await uploadPost({
        ...formData,
        photo: photoUrl,
        ownerId: userId,
        dateCreate: Date.now().toString(),
      });

      navigation.navigate("Posts");
      setPicture("");
      setFormData(initialState);
    } catch (error) {
      console.log("error:", error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.createPost}>
        <View style={styles.photo}>
          {picture && <Image source={{ uri: picture }} style={styles.img} />}
          <TouchableOpacity
            style={picture ? styles.btnPhotoActive : styles.btnPhoto}
            onPress={takePhoto}
          >
            <MaterialIcons
              name="photo-camera"
              size={24}
              color={picture ? "#fff" : "#BDBDBD"}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.text}>
          {picture ? "Редактировать фото" : "Загрузите фото"}
        </Text>
        <TextInput
          style={styles.input}
          value={formData.title}
          placeholder={"Название..."}
          placeholderTextColor="#bdbdbd"
          borderBottomColor={titleBorderColor}
          onChangeText={(value) =>
            setFormData((prevState) => ({ ...prevState, title: value }))
          }
          onFocus={() => setTitleBorderColor(accentBorderColor)}
          onBlur={() => setTitleBorderColor(defaultBorderColor)}
        />
        <View>
          <TextInput
            style={styles.inputCoords}
            value={
              picture
                ? `latitude: ${formData.coords.latitude}; longitude: ${formData.coords.longitude}`
                : ""
            }
            editable={false}
            placeholder={"Местность..."}
            borderBottomColor={coordsBorderColor}
            placeholderTextColor="#bdbdbd"
            onFocus={() => {
              setCoordsBorderColor(accentBorderColor);
            }}
            onBlur={() => setCoordsBorderColor(defaultBorderColor)}
          />
          <Feather
            style={styles.icon}
            name="map-pin"
            size={24}
            color="#bdbdbd"
          />
        </View>
        <TouchableOpacity style={styles.btn} onPress={onSubmit}>
          <Text style={styles.text}>Опубликовать</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}

export const styles = StyleSheet.create({
  container: {
    borderColor: "#f10e0e",
    borderWidth: 1,
  },
  createPost: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 32,
    backgroundColor: "#fff",
  },
  photo: {
    height: 240,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    marginBottom: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  btnPhoto: {
    position: "absolute",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  btnPhotoActive: {
    position: "absolute",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff4d",
  },
  img: {
    position: "absolute",
    height: 240,
    width: Dimensions.get("window").width - 16 * 2,
    top: 0,
    right: 0,
    borderRadius: 8,
  },
  text: {
    color: "#bdbdbd",
    fontSize: 16,
    lineHeight: 19,
    fontWeight: "400",
    fontFamily: "Roboto",
  },
  input: {
    height: 50,
    borderBottomWidth: 1,
    marginBottom: 16,
    marginTop: 32,
    fontSize: 16,
    lineHeight: 19,
    fontWeight: "400",
    fontFamily: "Roboto",
  },
  inputCoords: {
    height: 50,
    borderBottomWidth: 1,
    paddingLeft: 30,
    fontSize: 16,
    lineHeight: 19,
    fontWeight: "400",
    fontFamily: "Roboto",
  },
  icon: {
    position: "absolute",
    top: 13,
    left: 0,
  },
  btn: {
    height: 51,
    marginTop: 32,
    backgroundColor: "#F6F6F6",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});

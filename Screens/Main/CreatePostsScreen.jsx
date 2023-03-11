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
import { launchCameraAsync } from "expo-image-picker";

const defaultBorderColor = "#E8E8E8";
const accentBorderColor = "#FF6C00";

const initialState = {
  photo: "",
  title: "",
  coords: "",
};

export function CreatePostsScreen({ navigation, route }) {
  const [formData, setFormData] = useState(initialState);
  const [titleBorderColor, setTitleBorderColor] = useState(defaultBorderColor);
  const [coordsBorderColor, setCoordsBorderColor] =
    useState(defaultBorderColor);

  const takePhoto = async () => {
    const picture = await launchCameraAsync();
    setFormData((prevState) => ({
      ...prevState,
      photo: picture.assets[0].uri,
    }));
  };

  useEffect(() => {
    if (route.params) {
      setFormData((prevState) => ({ ...prevState, coords: route.params }));
    }
  }, [route.params]);

  const onSubmit = () => {
    console.log("formData:", formData);
    Keyboard.dismiss();
    setFormData(initialState);
    navigation.navigate("Posts");
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.createPost}>
        <View style={styles.photo}>
          {formData.photo && (
            <Image source={{ uri: formData.photo }} style={styles.img} />
          )}
          <TouchableOpacity
            style={formData.photo ? styles.btnPhotoActive : styles.btnPhoto}
            onPress={takePhoto}
          >
            <MaterialIcons
              name="photo-camera"
              size={24}
              color={formData.photo ? "#fff" : "#BDBDBD"}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.text}>
          {formData.photo ? "Редактировать фото" : "Загрузите фото"}
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
            value={formData.coords}
            placeholder={"Местность..."}
            borderBottomColor={coordsBorderColor}
            placeholderTextColor="#bdbdbd"
            onChangeText={(value) =>
              setFormData((prevState) => ({ ...prevState, coords: value }))
            }
            onFocus={() => {
              setCoordsBorderColor(accentBorderColor);
              navigation.navigate("Map");
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

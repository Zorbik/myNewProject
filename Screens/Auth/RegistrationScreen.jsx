import { useState } from "react";
import {
  ImageBackground,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
} from "react-native";
import { useDispatch } from "react-redux";
import { launchCameraAsync } from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import * as Permissions from "expo-permissions";

import { authRegisterUser } from "../../redux/auth/authOperations.js";
import { styles } from "./Auth.styles.jsx";
import { uploadPhotoToServer } from "../../firebase/uploadPhoto.js";

const initialState = {
  login: "",
  email: "",
  password: "",
  avatar: "",
};

const defaultBorderColor = "#E8E8E8";
const accentBorderColor = "#FF6C00";
const placeholderTextColor = "#bdbdbd";

export function RegistrationScreen({ navigation }) {
  const [showPassword, setShowPassword] = useState(true);
  const [loginBorderColor, setLoginBorderColor] = useState(defaultBorderColor);
  const [emailBorderColor, setEmailBorderColor] = useState(defaultBorderColor);
  const [passwordBorderColor, setPasswordBorderColor] =
    useState(defaultBorderColor);
  const [formData, setFormData] = useState(initialState);
  const [picture, setPicture] = useState("");

  const dispatch = useDispatch();

  const takePhoto = async () => {
    try {
      const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
      if (status !== "granted") {
        return console.log("Permission not granted");
      }
      const { assets } = await launchCameraAsync();

      if (!assets[0]?.uri) return;

      setPicture(assets[0].uri);
    } catch (error) {
      console.log("error:", error);
    }
  };

  const onSubmit = async () => {
    Keyboard.dismiss();
    if (!formData.email || !formData.password) {
      Toast.show({
        type: "error",
        text1: "You should enter login and password",
      });
      return;
    }

    try {
      const photoUrl = await uploadPhotoToServer(picture);

      dispatch(
        authRegisterUser({
          ...formData,
          login: formData.login.trim(),
          avatar: photoUrl,
        })
      );
    } catch (error) {
      console.log("error:", error);
    }

    setFormData(initialState);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ImageBackground
        source={require("../../assets/images/background.jpg")}
        style={styles.imageBgr}
      >
        <View style={styles.form}>
          <View style={styles.avatar}>
            {picture && <Image source={{ uri: picture }} style={styles.img} />}
            {picture ? (
              <TouchableOpacity
                style={picture ? styles.btnAddActive : styles.btnAdd}
                activeOpacity={1}
                onPress={() => setPicture("")}
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
          <Text style={styles.header}>Регистрация</Text>
          <TextInput
            style={styles.input}
            value={formData.login}
            placeholder={"Логин"}
            placeholderTextColor={placeholderTextColor}
            borderColor={loginBorderColor}
            onChangeText={(value) =>
              setFormData((prevState) => ({
                ...prevState,
                login: value,
              }))
            }
            onFocus={() => setLoginBorderColor(accentBorderColor)}
            onBlur={() => setLoginBorderColor(defaultBorderColor)}
          />
          <TextInput
            style={styles.input}
            value={formData.email}
            placeholder={"Адрес электронной почты"}
            placeholderTextColor={placeholderTextColor}
            borderColor={emailBorderColor}
            onChangeText={(value) =>
              setFormData((prevState) => ({
                ...prevState,
                email: value.trim(),
              }))
            }
            onFocus={() => setEmailBorderColor(accentBorderColor)}
            onBlur={() => setEmailBorderColor(defaultBorderColor)}
          />
          <View>
            <TextInput
              style={styles.input}
              placeholder={"Пароль"}
              value={formData.password}
              placeholderTextColor={placeholderTextColor}
              secureTextEntry={showPassword}
              borderColor={passwordBorderColor}
              onChangeText={(value) =>
                setFormData((prevState) => ({
                  ...prevState,
                  password: value,
                }))
              }
              onFocus={() => setPasswordBorderColor(accentBorderColor)}
              onBlur={() => setPasswordBorderColor(defaultBorderColor)}
            />
            <Text
              style={styles.btnShwText}
              onPress={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Показать" : "Скрыть"}
            </Text>
          </View>
          <TouchableOpacity
            onPress={onSubmit}
            style={styles.btnReg}
            activeOpacity={0.8}
          >
            <Text style={styles.textBtn}>Зарегистрироваться</Text>
          </TouchableOpacity>
          <Text
            onPress={() => navigation.navigate("Login")}
            style={styles.text}
          >
            Уже есть аккаунт? Войти
          </Text>
        </View>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
}

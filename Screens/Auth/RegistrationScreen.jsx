import { useState } from "react";
import {
  ImageBackground,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  // ScrollView,
} from "react-native";
import { styles } from "./Auth.styles.jsx";

const initialState = {
  login: "",
  email: "",
  password: "",
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

  const onSubmit = () => {
    console.log("formData:", formData);
    Keyboard.dismiss();
    setFormData(initialState);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {/* <ScrollView> */}
      <ImageBackground
        source={require("../../assets/images/background.jpg")}
        style={styles.imageBgr}
      >
        <View style={styles.form}>
          <View style={styles.avatar}>
            <TouchableOpacity
              style={styles.btnAdd}
              activeOpacity={1}
            ></TouchableOpacity>
          </View>
          <Text style={styles.header}>Регистрация</Text>
          <TextInput
            style={styles.input}
            value={formData.login}
            placeholder={"Логин"}
            placeholderTextColor={placeholderTextColor}
            borderColor={loginBorderColor}
            onChangeText={(value) =>
              setFormData((prevState) => ({ ...prevState, login: value }))
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
              setFormData((prevState) => ({ ...prevState, email: value }))
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
      {/* </ScrollView> */}
    </TouchableWithoutFeedback>
  );
}

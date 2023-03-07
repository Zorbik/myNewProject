import { useState } from "react";
import {
  ImageBackground,
  View,
  TextInput,
  Text,
  TouchableOpacity,
} from "react-native";
import { styles } from "./RegistrationScreen.styles.jsx";

export function RegistrationScreen() {
  const defaultBorderColor = "#E8E8E8";
  const accentBorderColor = "#FF6C00";
  const placeholderTextColor = "#bdbdbd";

  const [showPassword, setShowPassword] = useState(true);
  const [loginBorderColor, setLoginBorderColor] = useState(defaultBorderColor);
  const [emailBorderColor, setEmailBorderColor] = useState(defaultBorderColor);
  const [passwordBorderColor, setPasswordBorderColor] =
    useState(defaultBorderColor);

  return (
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
          placeholder={"Логин"}
          placeholderTextColor={placeholderTextColor}
          borderColor={loginBorderColor}
          onFocus={() => setLoginBorderColor(accentBorderColor)}
          onBlur={() => setLoginBorderColor(defaultBorderColor)}
        />
        <TextInput
          style={styles.input}
          placeholder={"Адрес электронной почты"}
          placeholderTextColor={placeholderTextColor}
          borderColor={emailBorderColor}
          onFocus={() => setEmailBorderColor(accentBorderColor)}
          onBlur={() => setEmailBorderColor(defaultBorderColor)}
        />
        <View>
          <TextInput
            style={styles.input}
            placeholder={"Пароль"}
            placeholderTextColor={placeholderTextColor}
            secureTextEntry={showPassword}
            borderColor={passwordBorderColor}
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
        <TouchableOpacity style={styles.btnReg} activeOpacity={0.8}>
          <Text style={styles.textBtn}>Зарегистрироваться</Text>
        </TouchableOpacity>
        <Text style={styles.text}>Уже есть аккаунт? Войти</Text>
      </View>
    </ImageBackground>
  );
}

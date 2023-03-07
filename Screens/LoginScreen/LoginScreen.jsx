import { useState } from "react";
import {
  ImageBackground,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { styles } from "../RegistrationScreen/RegistrationScreen.styles.jsx";

const initialState = {
  email: "",
  password: "",
};

export function LoginScreen() {
  const defaultBorderColor = "#E8E8E8";
  const accentBorderColor = "#FF6C00";
  const placeholderTextColor = "#bdbdbd";

  const [showPassword, setShowPassword] = useState(true);
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
      <ImageBackground
        source={require("../../assets/images/background.jpg")}
        style={styles.imageBgr}
      >
        <View style={styles.form}>
          <Text style={styles.header}>Войти</Text>
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
              value={formData.password}
              placeholder={"Пароль"}
              placeholderTextColor={placeholderTextColor}
              secureTextEntry={showPassword}
              borderColor={passwordBorderColor}
              onChangeText={(value) =>
                setFormData((prevState) => ({ ...prevState, password: value }))
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
            <Text style={styles.textBtn}>Войти</Text>
          </TouchableOpacity>
          <Text style={styles.text}>Нет аккаунта? Зарегистрироваться</Text>
        </View>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
}

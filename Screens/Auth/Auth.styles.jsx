import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  imageBgr: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  form: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#fff",
    width: "100%",
    fontFamily: "Roboto",
  },
  avatar: {
    position: "relative",
    borderRadius: 16,
    width: 120,
    height: 120,
    marginTop: -60,
    backgroundColor: "#F6F6F6",
    alignSelf: "center",
  },
  img: {
    borderRadius: 16,
    width: 120,
    height: 120,

    alignSelf: "center",
  },
  btnAdd: {
    position: "absolute",
    bottom: 14,
    right: -12.5,
    width: 25,
    height: 25,
    borderRadius: 25,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#FF6C00",
  },
  btnAddActive: {
    position: "absolute",
    bottom: 14,
    right: -12.5,
    width: 25,
    height: 25,
    borderRadius: 25,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E8E8E8",
  },
  btnReg: {
    height: 51,
    backgroundColor: "#FF6C00",
    margin: 16,
    marginTop: 27,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  btnShwText: {
    color: "#1B4371",
    fontSize: 16,
    lineHeight: 19,
    fontWeight: "400",
    position: "absolute",
    backgroundColor: "transparent",
    top: 17,
    right: 32,
  },
  textBtn: {
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
    color: "#fff",
  },
  header: {
    color: "#212121",
    fontSize: 30,
    height: 36,
    margin: 32,
    fontWeight: "500",
    lineHeight: 35,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    backgroundColor: "#F6F6F6",
    height: 50,
    borderRadius: 8,
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    paddingBottom: 15,
    color: "#212121",
  },
  text: {
    color: "#1B4371",
    fontSize: 16,
    marginBottom: 78,
    lineHeight: 19,
    fontWeight: "400",
    textAlign: "center",
  },
});

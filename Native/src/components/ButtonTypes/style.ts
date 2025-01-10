import { Dimensions, StyleSheet } from "react-native";
const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  styleButton: {
    marginTop: 15,
    width: "98%",
    height: 45,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: '#00e'
  },

  text: {
    color: "#fff",
    fontSize: width < 767 ? 20 : 50,
    fontWeight: "bold",
  },
})
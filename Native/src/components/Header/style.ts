import { StyleSheet, View } from "react-native";

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: '#f8f8ff',
    borderBottomWidth: 1.2,
    borderBottomColor: 'rgba(0, 0, 0, 0.5)',
  },
  logoNeki: {
    width: 160, 
    height: 50,  
    resizeMode: "contain", 
  },
});

export default styles;
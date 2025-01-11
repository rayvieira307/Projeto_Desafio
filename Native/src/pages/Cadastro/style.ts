import { Dimensions, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    gap: 1,
  },

  logo: {
    width: 200,
    height: 200,
    borderRadius: 20,
    marginBottom: 10,
    marginTop: 10,
  },

  boxMid: {
    marginTop: 30,
    height: 340,
    width: "100%",
    paddingHorizontal: 37,
  },

  boxBottom: {
    flexDirection: "row",
    height: 50,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginTop: 20,
  },
  text: {
    alignItems: "center",
    marginLeft: 5,
    fontSize: 28,
    fontWeight: 700,
    color: "#000",
  },

  input: {
    fontSize: 18,
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
    borderRadius: 5,
  },

  buttonText: {
    fontSize: 22,
    color: "#fff",
    fontWeight: "bold",
  },

  button: {
    marginTop: -50,
    borderRadius: 5,
    width: "80%",
    padding: 10,
    backgroundColor: "#42b",
    alignItems: "center",
  },

  modalMessage: {
    fontSize: 20, 
    color: '#000', 
    textAlign: 'center', 
    paddingHorizontal: 20, 
    marginTop: -28
  }
});

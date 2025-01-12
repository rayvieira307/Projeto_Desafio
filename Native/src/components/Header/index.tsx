import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native"; 
import styles from "./style"; 

 const Header: React.FC = () => {
  const navigation = useNavigation();

  const handleNavigation = () => {
    navigation.navigate("Login"); 
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={handleNavigation}>
        <Image
          source={require("../../../assets/neki-header.png")}
          style={styles.logoNeki}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

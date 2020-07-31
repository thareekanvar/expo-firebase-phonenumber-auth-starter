import React from "react";
import { StyleSheet, Text, View } from "react-native";
import AppButton from "../components/appButton";
import Colors from "../utils/colors";

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        {/* <Image source={require("../assets/flame.png")} style={styles.logo} /> */}
        <Text style={styles.subtitle}>Firebase Phone</Text>
      </View>
      <View style={styles.buttonContainer}>
        <AppButton title="Login" onPress={() => navigation.navigate("Login")} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: Colors.primary,
  },
  logoContainer: {
    position: "absolute",
    top: 60,
    alignItems: "center",
  },
  logo: {
    width: 125,
    height: 125,
  },
  subtitle: {
    fontSize: 24,
    fontWeight: "600",
    paddingVertical: 20,
    color: Colors.secondary,
  },
  buttonContainer: {
    padding: 20,
    paddingBottom: 60,
    width: "100%",
  },
});

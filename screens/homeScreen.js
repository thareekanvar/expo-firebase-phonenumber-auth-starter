import React from "react";
import { StyleSheet, View } from "react-native";
import AppButton from "../components/appButton";
import { logout } from "../components/firebase/firebase";

export default function HomeScreen() {
  async function handleSignOut() {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <View style={styles.container}>
      <AppButton title="Sign Out" onPress={handleSignOut} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

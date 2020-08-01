import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import Colors from "../utils/colors";

export default function Spinner() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="small" color={Colors.secondary} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

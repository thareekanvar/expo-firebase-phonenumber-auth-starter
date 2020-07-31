import Constants from "expo-constants";
import React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";

export default function SafeView({ children, style }) {
  return (
    <SafeAreaView style={[styles.safeAreaContainer, style]}>
      <View style={[styles.container, style]}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
  container: {
    flex: 1,
  },
});

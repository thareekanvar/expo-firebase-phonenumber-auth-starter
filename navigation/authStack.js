import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import LoginScreen from "../screens/loginScreen";
import WelcomeScreen from "../screens/welcomeScreen";

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator initialRouteName="Welcome" headerMode="none">
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
}

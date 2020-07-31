import { NavigationContainer } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { auth } from "../components/firebase/firebase";
import AppStack from "./appStack";
import AuthStack from "./authStack";
import { AuthUserContext } from "./authUserProvider";
import navigationTheme from "./navigationTheme";

export default function Routes() {
  const { user, setUser } = useContext(AuthUserContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // onAuthStateChanged returns an unSubscriber
    const unsubscribeAuth = auth.onAuthStateChanged(async (authUser) => {
      try {
        await (authUser ? setUser(authUser) : setUser(null));
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    });

    // unsubscribe auth listener on unmount
    return unsubscribeAuth;
  }, []);

  if (isLoading) {
    // return <Spinner />;
  }

  return (
    <NavigationContainer theme={navigationTheme}>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}

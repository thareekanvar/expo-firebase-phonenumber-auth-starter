import React, { useRef, useState } from "react";
import { StyleSheet } from "react-native";
import * as Yup from "yup";
import Form from "../components/forms/form";
import FormButton from "../components/forms/formButton";
import FormErrorMessage from "../components/forms/formErrorMessage";
import FormField from "../components/forms/formField";
import IconButton from "../components/iconButton";
import SafeView from "../components/safeView";
import Colors from "../utils/colors";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import firebaseConfig from "../components/firebase/firebaseConfig";
import { getVerificationId } from "../components/firebase/firebase";

const phoneRegExp = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*/g;

const validationSchema = Yup.object().shape({
  phoneNumber: Yup.string().matches(phoneRegExp, "Phone number is not valid"),
});

export default function LoginScreen({ navigation }) {
  const recaptchaVerifier = useRef(null);
  const [loginError, setLoginError] = useState("");

  async function handleGetVerificationId(values) {
    const { phoneNumber } = values;
    const recaptchaVerifierCurrent = recaptchaVerifier.current;
    try {
      let verificationId = await getVerificationId({
        phoneNumber,
        recaptchaVerifierCurrent,
      });
      console.log({ verificationId });
    } catch (error) {
      setLoginError(error.message);
    }
  }

  return (
    <SafeView style={styles.container}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
      />
      <IconButton
        style={styles.backButton}
        iconName="keyboard-backspace"
        color="#fff"
        size={30}
        onPress={() => navigation.goBack()}
      />
      <Form
        initialValues={{ phoneNumber: "" }}
        validationSchema={validationSchema}
        onSubmit={(values) => handleGetVerificationId(values)}
      >
        <FormField
          name="phoneNumber"
          leftIcon="phone"
          placeholder="Enter phone number"
          autoCapitalize="none"
          keyboardType="phone-pad"
          autoFocus={true}
        />

        <FormButton title={"Login"} />
        {<FormErrorMessage error={loginError} visible={true} />}
      </Form>
    </SafeView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: Colors.primary,
    justifyContent: "center",
  },
  footerButtonContainer: {
    marginVertical: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  forgotPasswordButtonText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: "600",
  },
  backButton: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
});

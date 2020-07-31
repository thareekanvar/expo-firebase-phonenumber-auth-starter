import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import React, { useRef, useState } from "react";
import { StyleSheet } from "react-native";
import * as Yup from "yup";
import {
  getVerificationId,
  firebaseLogin,
} from "../components/firebase/firebase";
import firebaseConfig from "../components/firebase/firebaseConfig";
import Form from "../components/forms/form";
import FormButton from "../components/forms/formButton";
import FormErrorMessage from "../components/forms/formErrorMessage";
import FormField from "../components/forms/formField";
import IconButton from "../components/iconButton";
import SafeView from "../components/safeView";
import Colors from "../utils/colors";

const phoneRegExp = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*/g;

const validationSchemaPhone = Yup.object().shape({
  phoneNumber: Yup.string().matches(phoneRegExp, "Phone number is not valid"),
});

const validationSchemaCode = Yup.object().shape({
  verificationCode: Yup.number(),
});

export default function LoginScreen({ navigation }) {
  const recaptchaVerifier = useRef(null);
  const [loginError, setLoginError] = useState("");
  const [verificationId, setVerificationId] = useState(null);
  const [codeError, setCodeError] = useState("");

  async function handleGetVerificationId(values) {
    const { phoneNumber } = values;
    const recaptchaVerifierCurrent = recaptchaVerifier.current;
    try {
      let verificationId = await getVerificationId({
        phoneNumber,
        recaptchaVerifierCurrent,
      });
      setVerificationId(verificationId);
    } catch (error) {
      setCodeError(error.message);
    }
  }

  async function handleLogin(values) {
    const { verificationCode } = values;
    try {
      let login = await firebaseLogin({ verificationCode, verificationId });

      console.log({ login });
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
      {!verificationId && (
        <Form
          initialValues={{ phoneNumber: "" }}
          validationSchema={validationSchemaPhone}
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

          <FormButton title={"send code"} />
          {<FormErrorMessage error={codeError} visible={true} />}
        </Form>
      )}
      {verificationId && (
        <Form
          initialValues={{ verificationCode: "" }}
          validationSchema={validationSchemaCode}
          onSubmit={(values) => handleLogin(values)}
        >
          <FormField
            name="verificationCode"
            leftIcon="phone"
            placeholder="Enter code"
            autoCapitalize="none"
            keyboardType="phone-pad"
            autoFocus={true}
          />

          <FormButton title={"login"} />
          {<FormErrorMessage error={loginError} visible={true} />}
        </Form>
      )}
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

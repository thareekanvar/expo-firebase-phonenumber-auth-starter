import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import React, { useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
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
import Spinner from "../components/spinner";

const phoneRegExp = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*/g;

const validationSchemaPhone = Yup.object().shape({
  phoneNumber: Yup.string().matches(phoneRegExp, "Phone number is not valid"),
});

const validationSchemaCode = Yup.object().shape({
  verificationCode: Yup.number(),
});

let RESEND_OTP_TIME_LIMIT = 30;

export default function LoginScreen({ navigation }) {
  const recaptchaVerifier = useRef(null);
  const [loginError, setLoginError] = useState("");
  const [verificationId, setVerificationId] = useState(null);
  const [codeError, setCodeError] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendButtonDisabledTime, setResendButtonDisabledTime] = useState(
    RESEND_OTP_TIME_LIMIT
  );

  function resendTime() {
    let time = resendButtonDisabledTime;
    for (i = 0; i <= time; i++) {
      time = time - 1;
      setResendButtonDisabledTime(time);
    }
    setResendButtonDisabledTime(RESEND_OTP_TIME_LIMIT);
    RESEND_OTP_TIME_LIMIT = RESEND_OTP_TIME_LIMIT + 30;
  }

  async function handleGetVerificationId(values) {
    const { phoneNumber } = values;
    const recaptchaVerifierCurrent = recaptchaVerifier.current;
    try {
      let verificationId = await getVerificationId({
        phoneNumber,
        recaptchaVerifierCurrent,
      });
      setPhoneNumber(phoneNumber);
      setVerificationId(verificationId);
      resendTime();
    } catch (error) {
      setCodeError(error.message);
    }
  }

  async function handleLogin(values) {
    const { verificationCode } = values;
    try {
      await firebaseLogin({ verificationCode, verificationId });
      RESEND_OTP_TIME_LIMIT = 30;
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

      {!verificationId && (
        <Form
          initialValues={{ phoneNumber: "" }}
          validationSchema={validationSchemaPhone}
          onSubmit={async (values) => await handleGetVerificationId(values)}
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
          onSubmit={async (values) => await handleLogin(values)}
        >
          <FormField
            name="verificationCode"
            leftIcon="phone"
            placeholder="Enter code"
            autoCapitalize="none"
            keyboardType="phone-pad"
            autoFocus={true}
          />
          <View style={styles.flexRow}>
            <Text
              style={styles.resendText}
              onPress={() => {
                setVerificationId(null);
                setPhoneNumber(null);
              }}
            >
              Wrong number?
            </Text>
            <View>
              {resendLoading && <Spinner />}
              {resendButtonDisabledTime >= 0
                ? !resendLoading && (
                    <Text style={styles.resendText}>
                      Resend otp in {resendButtonDisabledTime}
                    </Text>
                  )
                : !resendLoading && (
                    <Text
                      style={styles.resendText}
                      onPress={async () => {
                        setResendLoading(true);
                        let values = { phoneNumber };
                        await handleGetVerificationId(values);
                        setResendLoading(false);
                      }}
                    >
                      Resend otp
                    </Text>
                  )}
            </View>
          </View>

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
  resendText: {
    fontSize: 14,
    color: Colors.secondary,
    textAlign: "center",
  },
  flexRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
});

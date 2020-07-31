import * as firebase from "firebase";
import "firebase/auth";
import firebaseConfig from "./firebaseConfig";

// Initialize Firebase App

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();

export const logout = () => auth.signOut();

export const firebaseLogin = async ({ verificationId, verificationCode }) => {
  const credential = firebase.auth.PhoneAuthProvider.credential(
    verificationId,
    verificationCode
  );
  await firebase.auth().signInWithCredential(credential);

  return true;
};

export const getVerificationId = async ({
  phoneNumber,
  recaptchaVerifierCurrent,
}) => {
  const phoneProvider = new firebase.auth.PhoneAuthProvider();
  const verificationId = await phoneProvider.verifyPhoneNumber(
    phoneNumber,
    recaptchaVerifierCurrent
  );

  return verificationId;
};

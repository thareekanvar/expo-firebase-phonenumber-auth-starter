import * as Yup from "yup";

const phoneRegExp = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*/g;

export const validationSchemaPhone = Yup.object().shape({
  phoneNumber: Yup.string().matches(phoneRegExp, "Phone number is not valid"),
});

export const validationSchemaCode = Yup.object().shape({
  verificationCode: Yup.number(),
});

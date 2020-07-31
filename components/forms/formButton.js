import { useFormikContext } from "formik";
import React from "react";
import AppButton from "../appButton";

export default function FormButton({ title }) {
  const { handleSubmit } = useFormikContext();

  return <AppButton title={title} onPress={handleSubmit} />;
}

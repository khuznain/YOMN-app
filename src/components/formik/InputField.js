import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { theme } from "../../constants";

export const InputField = ({
  formikProps,
  formikKey,
  label,
  inputStyle = {},
  ...rest
}) => {
  return (
    <View>
      <Text style={styles.inputTitle}>{label}</Text>
      <TextInput
        style={[styles.input, inputStyle]}
        onChangeText={formikProps.handleChange(formikKey)}
        onBlur={formikProps.handleBlur(formikKey)}
        autoCapitalize="none"
        placeholder={label}
        {...rest}
      />
      <Text style={styles.errorText}>
        {formikProps.touched[formikKey] && formikProps.errors[formikKey]}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  inputTitle: {
    color: theme.colors.black,
    fontSize: 10,
    textTransform: "uppercase"
  },
  input: {
    borderBottomColor: "#8A8F9E",
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 40,
    fontSize: 15,
    color: "#161F3D"
  },
  errorText: {
    marginVertical: 15,
    color: theme.colors.accent
  }
});

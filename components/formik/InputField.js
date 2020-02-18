import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { theme } from "../../constants";

export const InputField = ({ formikProps, formikKey, label, ...rest }) => {
  return (
    <View>
      <Text style={styles.inputTitle}>{label}</Text>
      <TextInput
        style={styles.input}
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
    color: "#8A8F9E",
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
    color: theme.colors.accent
  }
});

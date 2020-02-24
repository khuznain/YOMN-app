import React from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { Text } from ".";
import { theme } from "../constants";

const EmptyMessage = ({ errorText = "", isLoading = false }) => (
  <View style={styles.container}>
    {isLoading && (
      <ActivityIndicator size="large" color={theme.colors.primary} />
    )}
    {!isLoading && (
      <Text primary size={20}>
        {errorText}
      </Text>
    )}
  </View>
);
export default EmptyMessage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 200,
    alignItems: "center",
    justifyContent: "center"
  }
});

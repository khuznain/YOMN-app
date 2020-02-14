import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Users = props => (
  <View style={styles.container}>
    <Text>Users</Text>
  </View>
);
export default Users;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

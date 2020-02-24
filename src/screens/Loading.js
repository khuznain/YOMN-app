import React from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { theme } from "../constants";

export default class LoadingScreen extends React.Component {
  componentDidMount() {
    this.props.navigation.navigate("App");
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Loading</Text>
        <ActivityIndicator
          size="large"
          color={theme.colors.primary}
        ></ActivityIndicator>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

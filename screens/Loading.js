import React from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";

export default class LoadingScreen extends React.Component {
  componentDidMount() {
    this.props.navigation.navigate("App");
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Loading</Text>
        <ActivityIndicator size="large"></ActivityIndicator>
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

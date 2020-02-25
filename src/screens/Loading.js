import React from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { theme } from "../constants";
import { connect } from "react-redux";

class LoadingScreen extends React.Component {
  componentDidMount() {
    this.props.navigation.navigate(this.props.user ? "App" : "Auth");
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

const mapStateToProps = state => {
  const user = state.user;
  return { user };
};

export default connect(mapStateToProps)(LoadingScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

import { ScrollView, StyleSheet } from "react-native";
import React, { Component } from "react";
import { NavigationActions } from "react-navigation";
import { ListItem } from "react-native-elements";
import { SafeAreaView } from "react-navigation";
import { logoutUser } from "../redux/user/user.actions";
import { theme } from "../constants";

class SideMenu extends Component {
  navigateToScreen = route => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <>
            <ListItem
              onPress={() => this.props.navigation.closeDrawer()}
              titleStyle={{ color: theme.colors.gray }}
              title="All Users"
              bottomDivider
              chevron
            />
            <ListItem
              onPress={this.navigateToScreen("UserItems")}
              titleStyle={{ color: theme.colors.gray }}
              title="My Items"
              bottomDivider
              chevron
            />

            <ListItem
              onPress={this.navigateToScreen("AddItem")}
              titleStyle={{ color: theme.colors.gray }}
              title="Add Items"
              bottomDivider
              chevron
            />

            <ListItem
              onPress={() => {
                logoutUser();
                this.props.navigation.navigate("Loading");
              }}
              titleStyle={{ color: theme.colors.gray }}
              title="Logout"
              bottomDivider
              chevron
            />
          </>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  }
});

export default SideMenu;
